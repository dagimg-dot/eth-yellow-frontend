<script setup>
import { useListings } from "@/composables/useListings";

const { listings, listingLoading } = useListings();
</script>

<template>
  <div class="d-flex flex-column ga-4 w-100">
    <Header />
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
