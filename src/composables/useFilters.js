import { ref, computed, watchEffect, watch, onMounted } from "vue";
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useFilterStore } from "@/store/modules/filterStore";
import { toast } from "vue3-toastify";
import gql from "graphql-tag";
import {
  GET_CATEGORIES,
  GET_CITIES,
  GET_LISTINGS,
  GET_USER_LISTINGS,
  dynamicQuery,
} from "@/graphql/queries";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";

export function useFilters() {
  const router = useRouter();
  const route = useRoute();
  const query = route.query;
  const filterStore = useFilterStore();
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

  watch(
    [choosenCategories, choosenCities, searchQuery],
    () => {
      const queryParams = {
        categories: choosenCategories.value.map(encodeURIComponent).join(","),
        cities: choosenCities.value.map(encodeURIComponent).join(","),
        search: encodeURIComponent(searchQuery.value),
      };

      router.push({ query: queryParams });
    },
    { deep: true }
  );

  const {
    load: fetchCategories,
    result: categoryResult,
    loading: categoryLoading,
  } = useLazyQuery(GET_CATEGORIES);
  const categories = computed(() => categoryResult.value?.categories || []);

  const {
    load: fetchCities,
    result: cityResult,
    loading: cityLoading,
  } = useLazyQuery(GET_CITIES);
  const cities = computed(() => cityResult.value?.locations || []);
  const uniqueCities = computed(() => [
    ...new Set(cities.value.map((c) => c.city)),
  ]);

  watchEffect(() => {
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
            filterStore.setUserListings(result.data.businesses);
          }
        });

        onUserListingError((error) => {
          toast.error("Failed to fetch listings, ", error.message);
        });

        watch(userListingLoading, () => {
          filterStore.setLoading(userListingLoading.value);
        });
      } else {
        const {
          onResult: onListingResult,
          onError,
          loading: fullListLoading,
        } = useQuery(GET_LISTINGS);

        onListingResult((result) => {
          if (result.data && result.data.businesses) {
            filterStore.setListings(result.data.businesses);
          }
        });

        onError((error) => {
          toast.error("Failed to fetch listings, ", error.message);
        });

        watch(fullListLoading, () => {
          filterStore.setLoading(fullListLoading.value);
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
      filterStore.setLoading(filteredListLoading.value);
    });

    onResult((result) => {
      if (result.data && result.data.businesses) {
        if (isUserListingPage) {
          filterStore.setUserListings(result.data.businesses);
        } else {
          filterStore.setListings(result.data.businesses);
        }
      }
    });

    onError((error) => {
      toast.error("Failed to fetch listings, ", error.message);
    });
  });

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
