<script setup>
import { useQuery } from "@vue/apollo-composable";
import GET_USER_LISTINGS from "@/graphql/queries/getUserBusiness.gql";
import { computed } from "vue";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const {
  result: listingResult,
  loading: listingLoading,
  onError: onListingError,
} = useQuery(
  GET_USER_LISTINGS,
  {
    owner_id: user.value.user_id,
  },
  {
    context: {
      authRequired: true,
    },
  }
);

const listings = computed(() => listingResult.value?.businesses ?? []);

onListingError((error) => {
  console.log("Failed to fetch listings: ", error.mesage);
});
</script>

<template>
  <VRow>
    <VCol lg="4" sm="6" cols="12" v-for="listing in listings">
      <ListingCard :listing="listing" :loading="listingLoading" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
