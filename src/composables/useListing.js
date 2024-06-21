import { GET_LISTING } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { watch } from "vue";
import { useListingStore } from "@/store/modules/listingStore";
import { storeToRefs } from "pinia";

export function useListing(id) {
  const listingStore = useListingStore();
  const { listing, loading } = storeToRefs(listingStore);

  const {
    loading: listingLoading,
    onError: onListingError,
    onResult: onListingResult,
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

  onListingResult((result) => {
    if (result.data && result.data.businesses_by_pk) {
      listingStore.setListing(result.data.businesses_by_pk);
    }
  });

  watch(listingLoading, (newLoading) => {
    listingStore.setLoading(newLoading);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listing, ", error.message);
  });

  return {
    listing,
    loading,
  };
}
