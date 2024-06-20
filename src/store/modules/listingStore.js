import { defineStore } from "pinia";
import { ref } from "vue";

export const useListingStore = defineStore("filter", () => {
  const listings = ref([]);
  const userListings = ref([]);
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

  function setLoading(value) {
    loading.value = value;
  }

  return {
    listings,
    loading,
    userListings,
    setListings,
    setLoading,
    setUserListings,
  };
});
