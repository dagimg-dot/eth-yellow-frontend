<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VCol>
    <VRow justify="space-between">
      <div class="text-h5 text-lg-h4 font-weight-bold">{{ props.title }}</div>
      <SortMenu />
    </VRow>
  </VCol>
</template>

<style scoped></style>
