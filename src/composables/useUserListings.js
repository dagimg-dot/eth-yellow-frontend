import { watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/modules/auth";
import { useListingStore } from "@/store/modules/listingStore";
import { storeToRefs } from "pinia";
import { GET_USER_LISTINGS } from "@/graphql/queries";

export function useUserListings() {
  const authStore = useAuthStore();
  const listingStore = useListingStore();
  const { userListings } = storeToRefs(listingStore);
  const { user } = storeToRefs(authStore);

  const {
    result: listingResult,
    loading: listingLoading,
    onError: onListingError,
  } = useQuery(
    GET_USER_LISTINGS,
    {
      owner_id: user.value.user_id,
    },
    {
      context: {
        authRequired: true,
      },
    }
  );

  watch(listingResult, (newResult) => {
    console.log("useUserListings newResult: ", newResult?.businesses);
    listingStore.setUserListings(newResult?.businesses);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });

  return {
    userListings,
    listingLoading,
  };
}
