<script setup>
import { useQuery } from "@vue/apollo-composable";
import GET_LISTINGS from "@/graphql/queries/getListings.gql";
import { computed } from "vue";
import { toast } from "vue3-toastify";

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
  toast.error("Failed to fetch listings, ", error.message);
});
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <FilterBar />
    <VRow>
      <VCol lg="4" sm="6" cols="12" v-for="listing in listings">
        <ListingCard
          :listing="listing"
          :loading="listingLoading"
          :isAllowed="false"
        />
      </VCol>
    </VRow>
  </div>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
