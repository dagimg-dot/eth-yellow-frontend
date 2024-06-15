<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { useReverseGeoCode } from "@/composables/reverseGeoCode";
import { locateUser } from "@/utils/geoLocation";
import GET_CATEGORIES from "@/graphql/queries/getCategories.gql";
import { useLazyQuery } from "@vue/apollo-composable";

const CUR_LOCATION = "Current Location";

const form = ref({
  location: "Location",
  searchQuery: null,
});

// Fetch categories
const {
  load: fetchCategories,
  result: categoryResult,
  loading: categoryLoading,
} = useLazyQuery(GET_CATEGORIES);

const categories = computed(() => categoryResult.value?.categories || []);

const formRef = ref(null);

const locationChoice = computed(() => form.value.location);

const mockFetchedCityList = ref(["Hawassa", "Bahir Dar", "Nazret", "Gondar"]);

const mockLocations = ref([CUR_LOCATION, ...mockFetchedCityList.value]);

const search = async () => {
  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  console.log(form.value);
};

const { locate, result, loading, error, abort } = useReverseGeoCode();

watch(locationChoice, () => {
  if (form.value.location === CUR_LOCATION) {
    locateUser();
  } else {
    abort();
  }
});

watchEffect(() => {
  if (result.value) {
    form.value.location =
      result.value.address.city || result.value.address.state;
  }

  if (error.value) {
    toast.error(error.value);
    error.value = null;
  }
});

const tags = ref(["Restaurant", "Clinic", "Pharmacy"]);

const locationRules = [(v) => v !== "Location" || "Location is required"];

const searchRules = [(v) => !!v || "Search query is required"];
</script>

<template>
  <VContainer class="search-wrapper pa-6">
    <VForm class="d-flex ga-4" @submit.prevent="search" ref="formRef">
      <VRow>
        <VCol cols="12" md="4">
          <VCombobox
            v-model="form.location"
            :items="mockLocations"
            dense
            prepend-inner-icon="bx-map"
            :loading="loading"
            @click:prepend-inner="locateUser(locate)"
            label="Location"
            :rules="locationRules"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VCombobox
            v-model="form.searchQuery"
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
