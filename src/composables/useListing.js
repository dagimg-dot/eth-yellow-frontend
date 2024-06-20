import { GET_LISTING } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { watch, ref } from "vue";

export function useListing(id) {
  const listing = ref({});

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
    if (newResult) {
      listing.value = newResult.businesses_by_pk;
    }
  });

  onListingError((error) => {
    toast.error("Failed to fetch listing, ", error.message);
  });

  return {
    listing,
    listingLoading,
  };
}
