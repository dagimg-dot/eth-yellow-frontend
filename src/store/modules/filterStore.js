import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const categories = ref([]);
  const cities = ref([]);
  const loading = ref(false);

  const setCategories = (newCategories) => {
    categories.value = newCategories;
  };

  const setCities = (newCities) => {
    cities.value = newCities;
  };

  const setLoading = (isLoading) => {
    loading.value = isLoading;
  };

  return {
    categories,
    cities,
    loading,
    setCategories,
    setCities,
    setLoading,
  };
});
