import { watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { useListingStore } from "@/store/modules/listingStore";
import { storeToRefs } from "pinia";
import { GET_LISTINGS } from "@/graphql/queries";

export function useListings() {
  const listingStore = useListingStore();
  const { listings } = storeToRefs(listingStore);

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
    listingStore.setListings(newResult?.businesses);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });

  return {
    listings,
    listingLoading,
  };
}
