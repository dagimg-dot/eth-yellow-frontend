<script setup>
import { ref, computed, watchEffect, watch } from "vue";
import {
  provideApolloClient,
  useLazyQuery,
  useQuery,
} from "@vue/apollo-composable";
import GET_CATEGORIES from "@/graphql/queries/getCategories.gql";
import GET_CITIES from "@/graphql/queries/getCities.gql";
import { dynamicQuery } from "@/graphql/queries/getFilteredListings";
import { defaultApolloClient } from "@/plugins/apollo";
import gql from "graphql-tag";
import { useFilterStore } from "@/store/modules/filterStore";
import { toast } from "vue3-toastify";
import GET_LISTINGS from "@/graphql/queries/getListings.gql";

provideApolloClient(defaultApolloClient);

const filterStore = useFilterStore();

const choosenCategories = ref([]);
const choosenCities = ref([]);
const searchQuery = ref("");

const loadingRef = ref(false);

// Fetch categories
const {
  load: fetchCategories,
  result: categoryResult,
  loading: categoryLoading,
} = useLazyQuery(GET_CATEGORIES, null, {
  context: {
    authRequired: false,
  },
});

const categories = computed(() => categoryResult.value?.categories || []);

// Fetch Cities
const {
  load: fetchCities,
  result: cityResult,
  loading: cityLoading,
} = useLazyQuery(GET_CITIES, null, {
  context: {
    authRequired: false,
  },
});

const cities = computed(() => cityResult.value?.locations || []);
const uniqueCities = computed(() => {
  const cityNames = cities.value.map((c) => c.city);
  return [...new Set(cityNames)];
});

watchEffect(async () => {
  if (
    !choosenCategories.value.length &&
    !choosenCities.value.length &&
    !searchQuery.value
  ) {
    // Fetch Listings
    const {
      onResult,
      onError,
      loading: fullListLoading,
    } = useQuery(GET_LISTINGS, null, {
      context: {
        authRequired: false,
      },
    });

    onResult((result) => {
      filterStore.setListings(result.data);
    });

    onError((error) => {
      toast.error("Failed to fetch listings, ", error.message);
    });

    watch(fullListLoading, () => {
      filterStore.setLoading(fullListLoading.value);
    });

    return;
  }

  const generatedQuery = dynamicQuery({
    categoryNames: choosenCategories.value,
    cityNames: choosenCities.value,
    query: searchQuery.value,
  });

  if (!generatedQuery.includes("$")) return;

  const queryDoc = gql`
    ${generatedQuery}
  `;

  const {
    onResult,
    onError,
    loading: filteredListLoading,
  } = useQuery(
    queryDoc,
    {
      categoryNames: choosenCategories.value,
      cityNames: choosenCities.value,
      query: `%${searchQuery.value}%`,
    },
    {
      context: {
        authRequired: false,
      },
    }
  );

  watch(filteredListLoading, () => {
    filterStore.setLoading(filteredListLoading.value);
  });

  onResult((result) => {
    filterStore.setListings(result.data);
  });

  onError((error) => {
    toast.error("Failed to fetch listings, ", error.message);
  });
});
</script>

<template>
  <div class="d-flex w-100">
    <VCol class="pl-0">
      <VTextField
        prepend-inner-icon="bx-search"
        v-model="searchQuery"
        label="Search"
        placeholder="Search listings . . ."
      />
    </VCol>
    <div class="d-flex w-50">
      <VCol class="w-75">
        <VCombobox
          v-model="choosenCategories"
          closable-chips
          label="Filter by category"
          class="item-list"
          clearable
          multiple
          chips
          @focus="fetchCategories()"
          :items="categories.map((category) => category.name)"
          :loading="categoryLoading"
        />
      </VCol>
      <VCol class="pr-0 w-75">
        <VCombobox
          v-model="choosenCities"
          closable-chips
          label="Filter by city"
          class="item-list"
          clearable
          multiple
          chips
          @focus="fetchCities()"
          :items="uniqueCities"
          :loading="cityLoading"
        />
      </VCol>
    </div>
  </div>
</template>

<style>
.item-list div.v-field__field > div {
  flex-wrap: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
}
</style>
