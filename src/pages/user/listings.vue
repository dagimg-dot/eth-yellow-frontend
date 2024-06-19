<script setup>
import { useQuery } from "@vue/apollo-composable";
import GET_USER_LISTINGS from "@/graphql/queries/getUserBusiness.gql";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { useFilterStore } from "@/store/modules/filterStore";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const filterStore = useFilterStore();
const { listings } = storeToRefs(filterStore);
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
          :loading="listingLoading"
          :isAllowed="true"
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
