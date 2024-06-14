<script setup>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const isXs = ref(false);
const drawer = ref(null);
const authStore = useAuthStore();
const route = useRoute();
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

const props = defineProps({
  isLanding: {
    type: Boolean,
    required: false,
    default: false,
  },
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
            <VBtn to="/auth/login" variant="elevated" block>{{
              isLoggedIn ? "Logout" : "Login"
            }}</VBtn>
          </VListItem>
          <VListItem v-if="route.fullPath !== '/listings/add'">
            <VBtn variant="outlined" to="/listings/add">Add Your Business</VBtn>
          </VListItem>
        </VList>
      </VContainer>
    </VNavigationDrawer>
    <VAppBar :color="props.isLanding ? 'transparent' : 'grey-50'" flat>
      <CompanyCard class="animate-fade-in-right" :reverse="props.isLanding" />
      <VSpacer />
      <nav v-if="!isXs" class="main-nav">
        <VBtn to="/">Home</VBtn>
        <VBtn to="/listings">Listings</VBtn>
        <VBtn to="/services">Services</VBtn>
        <VBtn to="/contact">Contact</VBtn>
      </nav>
      <VSpacer />
      <div class="d-flex ga-4 pr-4 align-center" v-if="!isXs">
        <VBtn
          variant="outlined"
          to="/listings/add"
          class="animate-fade-in-left"
          v-show="route.fullPath !== '/listings/add'"
        >
          Add Your Business
        </VBtn>

        <VBtn
          v-if="!isLoggedIn"
          to="/auth/login"
          variant="elevated"
          class="animate-fade-in-left"
        >
          Sign In
        </VBtn>
        <VAvatar v-if="isLoggedIn" class="animate-fade-in-left">
          <div>User</div>
        </VAvatar>
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

.v-app-bar {
  border-radius: 0 0 8px 8px;
}

.nav-drawer {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: #dddf00;
}
</style>
