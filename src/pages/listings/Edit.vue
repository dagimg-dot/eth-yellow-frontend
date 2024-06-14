<script setup>
const formObjFromAPI = {
  businessId: "2l34hl2k-23l4jl2-2j34l2jk",
  businessName: "The Club",
  businessEmail: "the.club@gmail.com",
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
