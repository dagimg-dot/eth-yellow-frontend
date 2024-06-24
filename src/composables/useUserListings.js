import { ref, watch } from "vue";
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
  const listingsLength = ref(userListings.value.length);
  const isLoadMoreBtnVisible = ref(true);

  const loadMoreUserListings = () => {
    fetchMore({
      variables: {
        owner_id: user.value.user_id,
        offset: listingsLength.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult?.businesses.length == 0) {
          toast.info("No more listings to load");
          isLoadMoreBtnVisible.value = false;
          return previousResult;
        }
        return {
          businesses: [
            ...previousResult.businesses,
            ...fetchMoreResult.businesses,
          ],
        };
      },
    });
  };

  const {
    result: listingResult,
    loading: listingLoading,
    onError: onListingError,
    fetchMore,
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
    listingsLength.value = newResult?.businesses.length;
    listingStore.setUserListings(newResult?.businesses);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });

  return {
    userListings,
    loadMoreUserListings,
    isLoadMoreBtnVisible,
    listingLoading,
  };
}
