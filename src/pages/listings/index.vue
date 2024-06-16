<script setup>
import { useQuery } from "@vue/apollo-composable";
import GET_LISTINGS from "@/graphql/queries/getListings.gql";
import { computed } from "vue";

// Fetch Listings
const {
  result: listingResult,
  loading: listingLoading,
  onError: onListingError,
} = useQuery(GET_LISTINGS, null, {
  context: {
    authRequired: false,
  },
});

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
