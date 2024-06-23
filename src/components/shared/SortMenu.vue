<script setup>
import { ref } from "vue";

const sortOptions = ref(["Alphabet", "Date ⬆", "Date ⬇", "Rating"]);
const choosenSort = ref("Sort by");
const setSortOption = (option) => {
  choosenSort.value = option;
};
</script>

<template>
  <div class="d-flex align-center ga-2">
    <span>{{ choosenSort }}</span>
    <div
      dot
      location="top right"
      offset-x="1"
      offset-y="1"
      color="success"

    >
      <VIcon icon="solar-sort-bold" size="32" class="cursor-pointer" />
      <VMenu offset="14px" activator="parent" location="bottom end" width="150">
        <VList>
          <VListItem
            v-for="option in sortOptions"
            :key="option"
            @click="setSortOption(option)"
            :active="choosenSort === option"
          >
            <VListItemTitle>{{ option }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>
  </div>
</template>

<style scoped></style>
