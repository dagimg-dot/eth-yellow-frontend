<script setup>
import { useUpdatePassword } from "@/composables/useUpdatePassword";
import { defineEmits, computed, ref, reactive } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  currentPassword: "",
  newPassword: "",
  confirmedPassword: "",
});

const resetForm = ref(null);

const isCurrentPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const currentPasswordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];

const newPasswordRules = [
  (v) => !!v || "Password is required",
  (v) => v !== form.currentPassword || "New password must be different",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];

const confirmedPasswordRules = [
  (v) => !!v || "Confirm Password is required",
  (v) => v === form.newPassword || "Password does not match",
];

const emit = defineEmits(["change:dialog"]);

const { executeUpdatePassword, loading, error, result } = useUpdatePassword();

const closeDialog = () => {
  emit("change:dialog", false);
};

const resetPassword = async () => {
  const { valid } = await resetForm.value.validate();

  if (!valid) {
    return;
  }

  await executeUpdatePassword({
    currentPassword: form.currentPassword,
    newPassword: form.newPassword,
  });

  if (error.value) {
    toast.error(error.value.message);
    return;
  }

  if (result.value && result.value.success) {
    toast.success(result.value.message);
    closeDialog();
  }
};

const dialogRef = computed({
  get: () => props.dialog,
  set: (value) => emit("change:dialog", value),
});
</script>

<template>
  <div class="text-center pa-4">
    <VDialog v-model="dialogRef" width="auto">
      <VCard
        min-width="400"
        prepend-icon="mdi-edit"
        title="Update Password"
        class="pa-2"
      >
        <VForm ref="resetForm" @submit.prevent="resetPassword">
          <VCardText class="d-flex flex-column ga-4">
            <VTextField
              v-model="form.currentPassword"
              label="Current Password"
              placeholder="············"
              :type="isCurrentPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'
              "
              @click:append-inner="
                isCurrentPasswordVisible = !isCurrentPasswordVisible
              "
              :rules="currentPasswordRules"
            />
            <VTextField
              v-model="form.newPassword"
              label="New Password"
              placeholder="············"
              :type="isNewPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
              :rules="newPasswordRules"
            />
            <VTextField
              v-model="form.confirmedPassword"
              label="Confirm New Password"
              placeholder="············"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'
              "
              @click:append-inner="
                isConfirmPasswordVisible = !isConfirmPasswordVisible
              "
              :rules="confirmedPasswordRules"
            />
          </VCardText>
          <VCardText class="d-flex ga-2">
            <VBtn
              variant="elevated"
              class="ms-auto"
              :loading="loading"
              text="Update"
              type="submit"
            />
            <VBtn variant="outlined" text="Cancel" @click="closeDialog" />
          </VCardText>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
