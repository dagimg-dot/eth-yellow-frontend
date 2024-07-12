<script setup>
import { useUserListings } from "@/composables/useUserListings";

const {
  userListings,
  loadMoreUserListings,
  listingLoading,
  isLoadMoreBtnVisible,
} = useUserListings();
</script>

<template>
  <div class="d-flex flex-column ga-4 w-100">
    <Header title="Your Listings" />
    <FilterBar :isDisabled="userListings.length == 0" />
    <VContainer v-if="userListings.length == 0 && !listingLoading" class="text-center">
      <VCardTitle>You have no registered listings</VCardTitle>
      <VBtn variant="outlined" to="/listings/add" class="w-auto mt-6"
        >Add Your Business</VBtn
      >
    </VContainer>
    <VRow>
      <VCol lg="4" sm="6" cols="12" v-show="listingLoading" v-for="item in 3">
        <VSkeletonLoader :loading="listingLoading" type="image, article" />
      </VCol>
      <VCol lg="4" sm="6" cols="12" v-for="listing in userListings">
        <ListingCard
          :listing="listing"
          :loading="listingLoading"
          :isAllowed="true"
        />
      </VCol>
    </VRow>
    <div class="d-flex justify-center mt-6">
      <div>
        <VBtn
          v-if="isLoadMoreBtnVisible && userListings.length > 0"
          @click="loadMoreUserListings"
          variant="text"
          block
          >Load More</VBtn
        >
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
