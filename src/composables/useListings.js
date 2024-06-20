import { watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { useFilterStore } from "@/store/modules/filterStore";
import { storeToRefs } from "pinia";
import { GET_LISTINGS } from "@/graphql/queries";

export function useListings() {
  const filterStore = useFilterStore();
  const { listings } = storeToRefs(filterStore);

  const {
    result: listingResult,
    loading: listingLoading,
    onError: onListingError,
  } = useQuery(GET_LISTINGS, null, {
    context: {
      authRequired: false,
    },
  });

  watch(listingResult, (newResult) => {
    filterStore.setListings(newResult?.businesses);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });

  return {
    listings,
    listingLoading,
  };
}
