<script setup>
import { useListing } from "@/composables/useListing";
import { useRoute } from "vue-router";

const route = useRoute();

const { listing, loading } = useListing(route.params.id);
</script>

<template>
  <VCard class="w-100 pa-6">
    <span class="text-h4">Update your business details</span>
    <ListingForm :business="listing" :loading="loading" />
  </VCard>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style scoped></style>
