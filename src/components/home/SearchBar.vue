<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { useReverseGeoCode } from "@/composables/useReverseGeoCode";
import { locateUser } from "@/utils/geoLocation";
import { GET_CITIES } from "@/graphql/queries";
import { useLazyQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useCategories } from "@/composables/useCategories";

const router = useRouter();
const CUR_LOCATION = "Current Location";

const locationChoice = ref("Location");
const categoriesChoice = ref([]);

const { fetchCategories, categories, categoryLoading } = useCategories();

// Fetch cities
const {
  load: fetchCities,
  result: cityResult,
  loading: cityLoading,
} = useLazyQuery(GET_CITIES);
const cities = computed(() => cityResult.value?.locations || []);
const uniqueCities = computed(() => [
  CUR_LOCATION,
  ...new Set(cities.value.map((c) => c.city)),
]);

const formRef = ref(null);

const search = async () => {
  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  router.push({
    name: "listings",
    query: {
      cities: [locationChoice.value].map(encodeURIComponent).join(","),
      categories: categoriesChoice.value.map(encodeURIComponent).join(","),
    },
  });
};

const { locate, result, loading, error, abort } = useReverseGeoCode();

watch(locationChoice, () => {
  if (locationChoice.value === CUR_LOCATION) {
    locateUser(locate);
  } else {
    abort();
  }
});

watchEffect(() => {
  if (result.value) {
    locationChoice.value =
      result.value.address.city || result.value.address.state;
  }

  if (error.value) {
    toast.error(error.value);
    error.value = null;
  }
});

const locationRules = [(v) => v !== "Location" || "Location is required"];

const searchRules = [(v) => !!v || "Search query is required"];
</script>

<template>
  <VContainer class="search-wrapper pa-6">
    <VForm class="d-flex ga-4" @submit.prevent="search" ref="formRef">
      <VRow>
        <VCol cols="12" md="4">
          <VCombobox
            v-model="locationChoice"
            :items="uniqueCities"
            dense
            prepend-inner-icon="bx-map"
            :loading="loading || cityLoading"
            @focus="fetchCities()"
            @click:prepend-inner="locateUser(locate)"
            label="Location"
            :rules="locationRules"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VCombobox
            v-model="categoriesChoice"
            multiple
            closable-chips
            clearable
            chips
            label="Search"
            placeholder="What do you need . . ."
            prepend-inner-icon="bx-search"
            :loading="categoryLoading"
            @focus="fetchCategories()"
            :items="categories.map((category) => category.name)"
            :rules="searchRules"
          />
        </VCol>
        <VCol cols="12" md="2" width="40">
          <VBtn
            :disabled="loading"
            type="submit"
            width="100%"
            max-height="56px"
            min-height="40px"
            height="100%"
            density="default"
          >
            Search
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VContainer>
</template>

<style scoped>
.search-wrapper {
  border-radius: 12px;
  backdrop-filter: blur(15px);
  background-color: #62752227;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
