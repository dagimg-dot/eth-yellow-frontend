<script setup>
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import avatar from "../../assets/images/avatar.png";
import { useTheme } from "vuetify";

const isXs = ref(false);
const drawer = ref(null);
const authStore = useAuthStore();
const route = useRoute();
const isAuthPage = route.fullPath.includes("/auth");
const { isLoggedIn, user } = storeToRefs(authStore);
const { name: themeName, global: globalTheme } = useTheme();

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

const authenticate = () => {
  if (isLoggedIn.value) {
    authStore.logout();
    toast.success("Logout successful");
  }
  drawer.value = null;
};
</script>

<template>
  <nav>
    <VNavigationDrawer
      temporary
      location="top"
      v-model:model-value="drawer"
      :class="
        themeName == 'light'
          ? 'nav-drawer nav-drawer-bg-light'
          : 'nav-drawer nav-drawer-bg-dark'
      "
    >
      <VContainer class="d-flex flex-column justify-space-between">
        <VList variant="plain">
          <div class="text-end">
            <VBtn icon="mdi-close" @click="drawer = null" variant="text" />
          </div>
          <VExpansionPanels v-if="isLoggedIn">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VListItem>
                  <template #prepend>
                    <VListItemAction start>
                      <VBadge
                        dot
                        location="bottom right"
                        offset-x="3"
                        offset-y="3"
                        color="success"
                      >
                        <VAvatar color="primary" variant="tonal">
                          <VImg :src="avatar" />
                        </VAvatar>
                      </VBadge>
                    </VListItemAction>
                  </template>

                  <VListItemTitle class="font-weight-semibold">
                    {{ user.username }}
                  </VListItemTitle>
                  <VListItemSubtitle>User</VListItemSubtitle>
                </VListItem>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VListItem link to="/user/profile">
                  <template #prepend>
                    <VIcon class="me-2" icon="bx-user" size="22" />
                  </template>

                  <VListItemTitle>Profile</VListItemTitle>
                </VListItem>

                <VListItem link to="/user/listings">
                  <template #prepend>
                    <VIcon class="me-2" icon="ri-file-list-3-fill" size="22" />
                  </template>

                  <VListItemTitle>My Business</VListItemTitle>
                </VListItem>

                <VListItem link>
                  <template #prepend>
                    <VIcon class="me-2" icon="fontisto-favorite" size="22" />
                  </template>

                  <VListItemTitle>Favorites</VListItemTitle>
                </VListItem>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
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
            <VBtn
              to="/auth/login"
              variant="elevated"
              block
              @click="authenticate"
              >{{ isLoggedIn ? "Logout" : "Login" }}</VBtn
            >
          </VListItem>
          <VListItem v-if="route.fullPath !== '/listings/add'">
            <VBtn variant="outlined" to="/listings/add" class="w-100"
              >Add Your Business</VBtn
            >
          </VListItem>
        </VList>
      </VContainer>
    </VNavigationDrawer>
    <VAppBar
      :color="props.isLanding ? 'transparent' : 'grey-50'"
      flat
      class="rounded-t-0 rounded-b-lg animate-fade-in-top"
    >
      <CompanyCard class="animate-fade-in-right" />
      <VSpacer />
      <nav v-if="!isXs" :class="isAuthPage ? 'nav-fix' : ''">
        <VBtn to="/">Home</VBtn>
        <VBtn to="/listings">Listings</VBtn>
        <VBtn to="/services">Services</VBtn>
        <VBtn to="/contact">Contact</VBtn>
      </nav>
      <VSpacer />
      <div class="d-flex ga-6 align-center" v-if="!isXs">
        <div v-if="!isAuthPage" class="d-flex ga-6 align-center">
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
            Login
          </VBtn>
        </div>
        <NavbarThemeSwitcher class="animate-fade-in-left" />
        <UserAvatarBadge class="animate-fade-in-left" />
      </div>
      <NavbarThemeSwitcher v-if="isXs" class="animate-fade-in-left" />
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

.nav-fix {
  padding-left: -10px;
  margin-right: 9.4rem;
}

.v-expansion-panel {
  background: transparent;
}

.nav-drawer-bg-light {
  // background-color: rgba(255, 255, 255, 0.7);
  background-color: rgba(104, 104, 117, 0.7);
  backdrop-filter: blur(10px);
}

.nav-drawer-bg-dark {
  background-color: rgba(35, 35, 51, 0.7);
  backdrop-filter: blur(10px);
}

.nav-drawer {
  color: #dddf00;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
