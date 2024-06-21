import { GET_LISTING } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { watch } from "vue";
import { useListingStore } from "@/store/modules/listingStore";
import { storeToRefs } from "pinia";

export function useListing(id) {
  const listingStore = useListingStore();
  const { listing } = storeToRefs(listingStore);

  const {
    result: listingResult,
    loading: listingLoading,
    onError: onListingError,
  } = useQuery(
    GET_LISTING,
    {
      business_id: id,
    },
    {
      context: {
        authRequired: false,
      },
    }
  );

  watch(listingResult, (newResult) => {
    listingStore.setListing(newResult?.businesses_by_pk);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listing, ", error.message);
  });

  return {
    listing,
    listingLoading,
  };
}
