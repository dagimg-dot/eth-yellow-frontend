import { useFilterStore } from "@/store/modules/filterStore";
import { storeToRefs } from "pinia";
import { GET_CATEGORIES } from "@/graphql/queries";
import { useLazyQuery } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import { watch } from "vue";

export function useCategories() {
  const filterStore = useFilterStore();
  const { categories } = storeToRefs(filterStore);

  const {
    load: fetchCategories,
    result: categoryResult,
    loading: categoryLoading,
    onError: onCategoryError,
  } = useLazyQuery(GET_CATEGORIES);

  watch(categoryResult, (newResult) => {
    if (newResult) {
      filterStore.setCategories(newResult.categories);
    }
  });

  onCategoryError((error) => {
    toast.error("Failed to fetch categories, ", error.message);
  });

  return {
    fetchCategories,
    categories,
    categoryLoading,
  };
}
