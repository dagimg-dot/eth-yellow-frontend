<script setup>
import { useListings } from "@/composables/useListings";

const { recentListings, listingLoading } = useListings({ type: "recent" });
</script>

<template>
  <section class="d-flex flex-column ga-4 w-100 my-16">
    <Header title="Recent Listings" :sortOption="false" class="mb-10"/>
    <VRow>
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
