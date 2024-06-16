<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.id);

const formObjFromAPI = {
  business_id: route.params.id,
  name: "The Club",
  email: "the.club@gmail.com",
};
</script>

<template>
  <VCard class="w-100 pa-6 h-screen">
    <span class="text-h4">Update your business details</span>
    <ListingForm :business="formObjFromAPI" />
  </VCard>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
