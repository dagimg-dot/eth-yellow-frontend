<script setup>
import { features } from "@/data/features";
</script>

<template>
  <v-layout max-width="1400px" class="mx-auto my-8 d-flex flex-column">
    <VRow>
      <VCol cols="12" class="mb-8">
        <h2 class="text-h4 text-center font-weight-bold">Features</h2>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="6" lg="4" class="mb-4" v-for="feature in features">
        <VCard outlined>
          <VCardTitle class="text-wrap">{{ feature.title }}</VCardTitle>
          <VCardText>
            <ul v-for="point in feature.bulletPoints">
              <li class="mt-2">{{ point }}</li>
            </ul>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </v-layout>
</template>

<style scoped>
.v-card {
  min-height: 210px;
}

li {
  list-style: none;
}
</style>
