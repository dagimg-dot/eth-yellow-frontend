<script setup>
import { useAuthStore } from "@/store/modules/auth";
import avatar from "../../assets/images/avatar.png";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn, user } = storeToRefs(authStore);

const logout = () => {
  authStore.logout();
  toast.success("Logout successful");
  router.push("/");
};
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
    v-if="isLoggedIn"
  >
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar" />
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
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
          <VDivider class="my-2" />

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
              <VIcon class="me-2" icon="gis-poi-favorite" size="22" />
            </template>

            <VListItemTitle>Favorites</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <VListItem link @click="logout">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<style scoped></style>
