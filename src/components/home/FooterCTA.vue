<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
const router = useRouter();
const authStore = useAuthStore();

const navigate = () => {
  const { isLoggedIn } = storeToRefs(authStore);
  if (isLoggedIn.value) {
    router.push("/listings/add");
  } else {
    router.push("/auth/signup");
    toast.info("Please sign up to continue");
  }
};
</script>

<template>
  <VLayout class="ma-4 ma-lg-0">
    <VCard>
      <VRow class="d-flex flex-column flex-md-column align-items-center">
        <VCol class="w-100 w-lg-66">
          <VCardTitle
            class="text-lg-h3 text-h5 text-pre-wrap text-md-h4 font-weight-bold text-center text-lg-left pl-0"
          >
            List your business with Ease!
          </VCardTitle>
          <VCardText class="text-h6 text-md-h5 text-center text-lg-left">
            Maximize your business's potential without the hassle. List with us
            to reach much more audience effortlessly.
          </VCardText>
          <VCardActions class="d-flex justify-lg-start justify-center">
            <VBtn
              variant="elevated"
              size="large"
              height="72"
              min-width="164"
              @click="navigate"
              >Get Started
            </VBtn>
          </VCardActions>
        </VCol>
      </VRow>
    </VCard>
  </VLayout>
</template>
<style scoped>
.v-layout {
  background: linear-gradient(
      to right,
      rgba(102, 204, 54, 0.582),
      rgba(0, 0, 0, 0.8)
    ),
    url("../../assets/images/fill_form3.jpg") no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  max-width: 100%;
}

.v-btn {
  border-radius: 8px;
}

.v-card {
  background: transparent;
  color: white;
  padding: 35px;
}
</style>
