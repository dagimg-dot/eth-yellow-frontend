<script setup>
import { useListings } from "@/composables/useListings";

const { recentListings, listingLoading } = useListings({ type: "recent" });
</script>

<template>
  <section class="d-flex flex-column ga-4 w-100 my-16">
    <VRow>
      <VCol cols="12" class="mb-8">
        <h2 class="text-h4 text-center font-weight-bold text-primary">Recent Listings</h2>
      </VCol>
    </VRow>
    <VRow>
      <VCol lg="4" sm="6" cols="12" v-show="listingLoading" v-for="item in 3">
        <VSkeletonLoader :loading="listingLoading" type="image, article" />
      </VCol>
      <VCol lg="4" sm="6" cols="12" v-for="listing in recentListings">
        <ListingCard
          :listing="listing"
          :loading="listingLoading"
          :isAllowed="false"
        />
      </VCol>
    </VRow>
  </section>
</template>

<style scoped></style>
