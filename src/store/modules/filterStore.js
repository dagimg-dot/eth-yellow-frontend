import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filter", () => {
  const listings = ref([]);
  const loading = ref(false);

  function setListings(newListings) {
    if (newListings && newListings.businesses) {
      listings.value = newListings.businesses;
    }
  }

  function setLoading(value) {
    loading.value = value;
  }

  return { listings, setListings, setLoading };
});
