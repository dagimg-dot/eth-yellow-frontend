<script setup>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

const isXs = ref(false);
const drawer = ref(null);
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const onResize = () => {
  isXs.value = window.innerWidth < 1110;
};

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize, { passive: true });
});

watch(isXs, () => {
  if (!isXs.value) {
    drawer.value = null;
  }
});
</script>

<template>
  <nav>
    <VNavigationDrawer
      temporary
      location="end"
      v-model:model-value="drawer"
      class="nav-drawer"
    >
      <VContainer class="d-flex flex-column justify-space-between h-screen">
        <VList variant="plain">
          <VListItem>
            <RouterLink to="/" class="text-decoration-none text-primary">
              <VListItemTitle>Home</VListItemTitle>
            </RouterLink>
          </VListItem>
          <VListItem>
            <RouterLink
              to="/listings"
              class="text-decoration-none text-primary"
            >
              <VListItemTitle>Listings</VListItemTitle>
            </RouterLink>
          </VListItem>
          <VListItem>
            <VListItemTitle>Services</VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>Contact</VListItemTitle>
          </VListItem>
        </VList>
        <VList class="text-end">
          <VDivider class="mb-2" />
          <VListItem>
            <VBtn to="/auth/login" variant="elevated" block>Login</VBtn>
          </VListItem>
          <VListItem>
            <VBtn variant="outlined" to="/listings/add">Add Your Business</VBtn>
          </VListItem>
        </VList>
      </VContainer>
    </VNavigationDrawer>
    <VAppBar color="transparent" flat>
      <CompanyCard class="animate-fade-in-right" />
      <VSpacer />
      <nav v-if="!isXs" class="main-nav">
        <VBtn to="/">Home</VBtn>
        <VBtn to="/listings">Listings</VBtn>
        <VBtn to="/services">Services</VBtn>
        <VBtn to="/contact">Contact</VBtn>
      </nav>
      <VSpacer />
      <div class="d-flex ga-6 px-4" v-if="!isXs">
        <VBtn variant="outlined" to="/listings/add" class="animate-fade-in-left"
          >Add Your Business</VBtn
        >
        <VBtn v-if="!isLoggedIn" to="/auth/login" variant="elevated"
          >Sign In</VBtn
        >
      </div>
      <VAppBarNavIcon
        @click="drawer = !drawer"
        v-if="isXs"
        size="x-large"
        class="animate-fade-in-left"
      />
    </VAppBar>
  </nav>
</template>

<style scoped lang="scss">
@use "@/scss/animation.scss" as *;

.nav-drawer {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: #dddf00;
}
</style>
