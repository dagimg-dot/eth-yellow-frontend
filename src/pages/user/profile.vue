<script setup>
import avatar from "@/assets/images/avatar.png";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import { GET_USER } from "@/graphql/queries";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations";
import ListingRules from "@/utils/listingFormRules";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";

const {
  result: userResult,
  loading: userLoading,
  onError: onUserError,
  onResult: onUserResult,
} = useQuery(GET_USER, null, {
  context: {
    authRequired: true,
  },
});

onUserError(() => {
  toast.error("Failed to fetch user details, please try again later.");
});

const userDetails = computed(() => userResult.value?.users[0] ?? {});

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  phone_number: "",
});

onUserResult(() => {
  form.value = {
    first_name: userDetails.value.first_name,
    last_name: userDetails.value.last_name,
    email: userDetails.value.email,
    username: userDetails.value.username,
    phone_number: userDetails.value.phone_number,
  };
});

const isAccountDeactivated = ref(false);

const deleteAccount = () => {
  console.log("Account deleted");
};

const resetForm = () => {
  form.value = {
    first_name: userDetails.value.first_name,
    last_name: userDetails.value.last_name,
    email: userDetails.value.email,
    username: userDetails.value.username,
    phone_number: userDetails.value.phone_number,
  };
};

const isFormUpdated = computed(() => {
  return (
    form.value.first_name !== userDetails.value.first_name ||
    form.value.last_name !== userDetails.value.last_name ||
    form.value.email !== userDetails.value.email ||
    form.value.username !== userDetails.value.username ||
    form.value.phone_number != userDetails.value.phone_number
  );
});

const avatarImg = ref(avatar);
const refInputEl = ref();

const changeAvatar = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string")
        avatarImg.value.avatarImg = fileReader.result;
    };
  }
};

const resetAvatar = () => {
  avatar.value = "";
};

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const {
  mutate: updateUserInfo,
  loading: updateLoading,
  onError: onUpdateError,
  onDone: onUpdateDone,
} = useMutation(UPDATE_USER_MUTATION, {
  context: {
    authRequired: true,
  },
  update: (cache, { data }) => {
    if (data?.update_users_by_pk) {
      cache.writeQuery({
        query: GET_USER,
        data: {
          users: [data.update_users_by_pk],
        },
      });
    }
  },
});

onUpdateDone(() => {
  toast.success("Profile updated successfully");
});

onUpdateError((error) => {
  toast.error("Failed to update profile, ", error.message);
});

const updateProfile = async () => {
  console.log(form.value);
  await updateUserInfo({
    user_id: user.value.user_id,
    first_name: form.value.first_name,
    last_name: form.value.last_name,
    email: form.value.email,
    username: form.value.username,
    phone_number: form.value.phone_number,
  });
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="avatar" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center ga-5">
            <div class="d-flex flex-wrap ga-4">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg"
                hidden
                @input="changeAvatar"
              />

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="bx-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, JPEG or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <VForm class="mt-6" @submit.prevent="updateProfile">
            <VRow>
              <VCol md="6" cols="12">
                <VTextField
                  v-model="form.first_name"
                  placeholder="Alemu"
                  label="First Name"
                  :rules="ListingRules.nameRules"
                  :loading="userLoading"
                />
              </VCol>
              <VCol md="6" cols="12">
                <VTextField
                  v-model="form.last_name"
                  placeholder="Dinku"
                  label="Last Name"
                  :rules="ListingRules.nameRules"
                  :loading="userLoading"
                />
              </VCol>
              <VCol md="6" cols="12">
                <VTextField
                  v-model="form.username"
                  placeholder="jvon"
                  label="Username"
                  :rules="ListingRules.nameRules"
                  :loading="userLoading"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="form.email"
                  label="E-mail"
                  :loading="userLoading"
                  :rules="ListingRules.emailRules"
                  placeholder="alemu.dinku@gmail.com"
                  type="email"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="form.phone_number"
                  label="Phone Number"
                  :rules="ListingRules.phoneRules"
                  :loading="userLoading"
                  placeholder="0918......"
                />
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap ga-4">
                <VBtn
                  type="submit"
                  :disabled="!isFormUpdated"
                  :loading="updateLoading"
                  >Save changes</VBtn
                >

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard title="Delete Account">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="I confirm my account deletion"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="deleteAccount"
          >
            Delete Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
