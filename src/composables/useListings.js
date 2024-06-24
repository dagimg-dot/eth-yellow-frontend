import { ref, unref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { useListingStore } from "@/store/modules/listingStore";
import { storeToRefs } from "pinia";
import { GET_LISTINGS } from "@/graphql/queries";
import { GET_RECENT_LISTINGS } from "@/graphql/queries";

const getQuery = (type) => {
  switch (type) {
    case "all":
      return GET_LISTINGS;
    case "recent":
      return GET_RECENT_LISTINGS;
    default:
      return GET_LISTINGS;
  }
};

const setListings = (type, store, listings) => {
  switch (type) {
    case "all":
      store.setListings(listings);
      break;
    case "recent":
      store.setRecentListings(listings);
      break;
    default:
      store.setListings(listings);
  }
};

export function useListings({ type }) {
  const listingStore = useListingStore();
  const { listings, recentListings } = storeToRefs(listingStore);
  const listingsLength = ref(listings.value.length);

  const loadMoreListings = () => {
    fetchMore({
      variables: {
        offset: listingsLength.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult,
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
    getQuery(type),
    {
      offset: listingsLength.value,
    },
    {
      context: {
        authRequired: false,
      },
    }
  );

  watch(listingResult, (newResult) => {
    listingsLength.value = newResult?.businesses?.length;
    console.log("listings length: ", listingsLength.value);
    setListings(type, listingStore, newResult?.businesses);
  });

  onListingError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });

  switch (type) {
    case "all":
      return {
        listings,
        listingLoading,
        loadMoreListings,
      };
    case "recent":
      return {
        recentListings,
        listingLoading,
        loadMoreListings,
      };
  }
}
