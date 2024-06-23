import { defineStore } from "pinia";
import { ref } from "vue";

export const useListingStore = defineStore("filter", () => {
  const listings = ref([]);
  const userListings = ref([]);
  const recentListings = ref([]);
  const listing = ref({});
  const loading = ref(false);

  function setListings(newListings) {
    if (newListings) {
      listings.value = newListings;
    }
  }

  function setUserListings(newListings) {
    if (newListings) {
      userListings.value = newListings;
    }
  }

  function setRecentListings(newListings) {
    if (newListings) {
      recentListings.value = newListings;
    }
  }

  function setListing(newListing) {
    if (newListing) {
      listing.value = newListing;
    }
  }

  function setLoading(value) {
    loading.value = value;
  }

  return {
    listings,
    userListings,
    recentListings,
    listing,
    loading,
    setListings,
    setRecentListings,
    setListing,
    setLoading,
    setUserListings,
  };
});
