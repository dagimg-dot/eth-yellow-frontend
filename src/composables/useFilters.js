import { ref, computed, watch, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useListingStore } from "@/store/modules/listingStore";
import { useCategories } from "@/composables/useCategories";
import { useCities } from "./useCities";
import { toast } from "vue3-toastify";
import gql from "graphql-tag";
import {
  GET_LISTINGS,
  GET_USER_LISTINGS,
  dynamicQuery,
} from "@/graphql/queries";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import debounce from "lodash/debounce";
import defu from "defu";

export function useFilters() {
  const router = useRouter();
  const route = useRoute();
  const query = route.query;
  const listingStore = useListingStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const choosenCategories = ref([]);
  const choosenCities = ref([]);
  const searchQuery = ref("");
  const isUserListingPage = route.path === "/user/listings";

  onMounted(() => {
    if (query.categories) {
      choosenCategories.value = query.categories
        .split(",")
        .map(decodeURIComponent);
    }
    if (query.cities) {
      choosenCities.value = query.cities.split(",").map(decodeURIComponent);
    }
    if (query.search) {
      searchQuery.value = decodeURIComponent(query.search);
    }
  });

  const updateURLFilters = () => {
    const queryParams = defu(
      choosenCategories.value.length
        ? {
            categories: choosenCategories.value
              .map(encodeURIComponent)
              .join(","),
          }
        : {},
      choosenCities.value.length
        ? { cities: choosenCities.value.map(encodeURIComponent).join(",") }
        : {},
      searchQuery.value ? { search: encodeURIComponent(searchQuery.value) } : {}
    );

    router.push({ query: queryParams });
  };

  const { fetchCategories, categories, categoryLoading } = useCategories();
  const { fetchCities, uniqueCities, cityLoading } = useCities();

  const executeDynamicQuery = debounce(() => {
    if (
      !choosenCategories.value.length &&
      !choosenCities.value.length &&
      !searchQuery.value
    ) {
      if (isUserListingPage) {
        const {
          loading: userListingLoading,
          onError: onUserListingError,
          onResult: onUserListingResult,
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

        onUserListingResult((result) => {
          if (result.data && result.data.businesses) {
            listingStore.setUserListings(result.data.businesses);
          }
        });

        onUserListingError((error) => {
          toast.error("Failed to fetch listings, ", error.message);
        });

        watch(userListingLoading, () => {
          listingStore.setLoading(userListingLoading.value);
        });
      } else {
        const {
          onResult: onListingResult,
          onError,
          loading: fullListLoading,
        } = useQuery(GET_LISTINGS);

        onListingResult((result) => {
          if (result.data && result.data.businesses) {
            listingStore.setListings(result.data.businesses);
          }
        });

        onError((error) => {
          toast.error("Failed to fetch listings, ", error.message);
        });

        watch(fullListLoading, () => {
          listingStore.setLoading(fullListLoading.value);
        });
      }

      return;
    }

    const generatedQuery = dynamicQuery({
      categoryNames: choosenCategories.value,
      cityNames: choosenCities.value,
      query: searchQuery.value,
      owner_id: isUserListingPage ? user.value.user_id : null,
    });

    const queryDoc = gql`
      ${generatedQuery}
    `;

    const {
      onResult,
      onError,
      loading: filteredListLoading,
    } = useQuery(queryDoc, {
      categoryNames: choosenCategories.value,
      cityNames: choosenCities.value,
      query: `%${searchQuery.value}%`,
      owner_id: isUserListingPage ? user.value.user_id : null,
    });

    watch(filteredListLoading, () => {
      listingStore.setLoading(filteredListLoading.value);
    });

    onResult((result) => {
      if (result.data && result.data.businesses) {
        if (isUserListingPage) {
          listingStore.setUserListings(result.data.businesses);
        } else {
          listingStore.setListings(result.data.businesses);
        }
      }
    });

    onError((error) => {
      toast.error("Failed to fetch listings, ", error.message);
    });
  }, 300);

  watch(
    [choosenCategories, choosenCities, searchQuery],
    () => {
      updateURLFilters();
      executeDynamicQuery();
    },
    {
      deep: true,
    }
  );

  return {
    choosenCategories,
    choosenCities,
    searchQuery,
    fetchCategories,
    fetchCities,
    categories,
    uniqueCities,
    categoryLoading,
    cityLoading,
  };
}
