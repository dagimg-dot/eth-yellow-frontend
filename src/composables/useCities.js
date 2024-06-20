import { useFilterStore } from "@/store/modules/filterStore";
import { storeToRefs } from "pinia";
import { GET_CITIES } from "@/graphql/queries";
import { useLazyQuery } from "@vue/apollo-composable";
import { watch, computed } from "vue";
import { toast } from "vue3-toastify";

export function useCities() {
  const filterStore = useFilterStore();
  const { cities } = storeToRefs(filterStore);

  const {
    load: fetchCities,
    result: cityResult,
    loading: cityLoading,
    onError: onCityError,
  } = useLazyQuery(GET_CITIES);

  watch(cityResult, (newResult) => {
    if (newResult) {
      console.log(newResult);
      filterStore.setCities(newResult.locations);
    }
  });

  onCityError((error) => {
    toast.error("Failed to fetch cities, ", error.message);
  });

    const uniqueCities = computed(() => [
      ...new Set(cities.value.map((c) => c.city)),
    ]);

  return {
    fetchCities,
    uniqueCities,
    cityLoading,
  };
}
