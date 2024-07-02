<script setup>
import { ref } from "vue";
import { useLogin } from "@/composables/useLogin";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];

const isPasswordVisible = ref(false);
const loginForm = ref(null);

const { loading, error, result, executeLogin } = useLogin();
const router = useRouter();

const loginHandler = async () => {
  const { valid } = await loginForm.value.validate();

  if (!valid) {
    return;
  }

  await executeLogin(form.value);

  if (result.value && result.value.success) {
    toast.success(result.value.message);
    router.push("/");

    authStore.login(result.value.accessToken, result.value.user);
  }
};
</script>

<template>
  <VCard class="auth-card pa-4 pt-7" max-width="448">
    <RouterLink class="text-decoration-none text-primary" to="/">
      <VCardItem class="justify-center">
        <VCardTitle class="text-2xl font-weight-bold"> ethyellow. </VCardTitle>
      </VCardItem>
    </RouterLink>

    <VCardText class="pt-2">
      <h5 class="text-h5 mb-1">Welcome to ethyellow! 👋🏻</h5>
      <p class="mb-0">
        Please sign-in to your account and start your business adventure
      </p>
    </VCardText>

    <VCardText>
      <VForm @submit.prevent="loginHandler" ref="loginForm">
        <VRow>
          <!-- Email -->
          <VCol cols="12">
            <VTextField
              v-model="form.email"
              autofocus
              placeholder="johndoe@email.com"
              label="Email"
              :rules="emailRules"
              type="email"
              required
            />
          </VCol>

          <!-- Password -->
          <VCol>
            <VTextField
              v-model="form.password"
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              :rules="passwordRules"
              required
            />

            <!-- remember me checkbox -->
            <div
              class="d-flex align-center justify-space-between flex-wrap mt-1 mb-2"
            >
              <VCheckbox v-model="form.remember" label="Remember me" />

              <RouterLink class="text-primary ms-2 mb-1" to="">
                Forgot Password?
              </RouterLink>
            </div>

            <!-- Error Alert -->
            <div class="mb-6">
              <v-alert
                v-if="error"
                icon="bxs-x-circle"
                :text="error"
                type="error"
                variant="tonal"
                closable
              >
              </v-alert>
            </div>

            <!-- login button -->
            <VBtn block type="submit" :loading="loading"> Login </VBtn>
          </VCol>

          <!-- create account -->
          <VCol cols="12" class="text-center text-base">
            <span>New on our platform?</span>
            <RouterLink class="text-primary ms-2" to="/auth/signup">
              Create an account
            </RouterLink>
          </VCol>

          <VCol cols="12" class="d-flex align-center">
            <VDivider />
            <span class="mx-4">or</span>
            <VDivider />
          </VCol>
          <VCol cols="12" class="text-center">
            <AuthProvider />
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>

<style scoped>
.auth-card {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>
