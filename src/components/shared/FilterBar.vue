<script setup>
import { useFilters } from "@/composables/useFilters";
import { provideApolloClient } from "@vue/apollo-composable";
import { defaultApolloClient } from "@/plugins/apollo";

provideApolloClient(defaultApolloClient);

const {
  choosenCategories,
  choosenCities,
  searchQuery,
  fetchCategories,
  fetchCities,
  categories,
  uniqueCities,
  categoryLoading,
  cityLoading,
} = useFilters();

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
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
        :disabled="props.isDisabled"
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
          :disabled="props.isDisabled"
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
          :disabled="props.isDisabled"
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
