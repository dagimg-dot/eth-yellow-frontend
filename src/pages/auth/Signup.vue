<script setup>
import { ref } from "vue";
import { useSignup } from "@/composables/signup";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmedPassword: "",
});

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];

const usernameRules = [
  (v) => !!v || "Username is required",
  (v) => v.length >= 5 || "Username must be at least 5 characters",
];

const confirmedPasswordRules = [
  (v) => !!v || "Confirm Password is required",
  (v) => v === form.value.password || "Password does not match",
];

const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const signupForm = ref(null);

const { loading, error, result, executeSignup } = useSignup();
const router = useRouter();

const signupHandler = async () => {
  const { valid } = await signupForm.value.validate();

  if (!valid) {
    return;
  }

  await executeSignup(form.value);

  if (result.value && result.value.success) {
    toast.success(
      result.value.message + " You are being redirected to the login page"
    );
    router.push("/auth/login");
  }
};
</script>

<template>
  <div class="d-flex h-screen align-center justify-center">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <RouterLink class="text-decoration-none text-primary" to="/">
        <VCardItem class="justify-center">
          <VCardTitle class="text-2xl font-weight-bold">
            ethyellow.
          </VCardTitle>
        </VCardItem>
      </RouterLink>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Adventure starts here 🚀</h5>
        <p class="mb-0">
          Reach larger audience with <strong>ethyellow.</strong> Sign up to get
          started.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="signupHandler" ref="signupForm">
          <VRow>
            <!-- Email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                placeholder="jvon"
                label="Username"
                :rules="usernameRules"
                type="text"
                required
              />
            </VCol>

            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                placeholder="johndoe@email.com"
                label="Email"
                :rules="emailRules"
                type="email"
                required
              />
            </VCol>

            <!-- Password -->
            <VCol cols="12">
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
            </VCol>

            <!-- Confirm Password -->
            <VCol cols="12">
              <VTextField
                v-model="form.confirmedPassword"
                label="Confirm Password"
                placeholder="············"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'
                "
                @click:append-inner="
                  isConfirmPasswordVisible = !isConfirmPasswordVisible
                "
                :rules="confirmedPasswordRules"
                required
              />

              <!-- Error Alert -->
              <div class="my-8">
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

              <!-- signup button -->
              <VBtn block type="submit" :loading="loading"> Sign Up </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" to="/auth/login">
                Sign in
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>
            <!-- auth providers -->
            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.auth-card {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>
