<script setup>
import { useQuery } from "@vue/apollo-composable";
import GET_LISTINGS from "@/graphql/queries/getListings.gql";
import { toast } from "vue3-toastify";
import { useFilterStore } from "@/store/modules/filterStore";
import { storeToRefs } from "pinia";

const filterStore = useFilterStore();
const { listings, loading } = storeToRefs(filterStore);

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

filterStore.setListings(listingResult.value?.businesses);

onListingError((error) => {
  toast.error("Failed to fetch listings, ", error.message);
});
</script>

<template>
  <div class="d-flex flex-column ga-4 w-100">
    <Header />
    <FilterBar />
    <VRow>
      <VCol lg="4" sm="6" cols="12" v-for="listing in listings">
        <ListingCard
          :listing="listing"
          :loading="listingLoading || loading"
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
