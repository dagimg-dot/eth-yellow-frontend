<script setup>
import { ref, onMounted } from "vue";
import bikeRiders from "../assets/images/aboutus.jpeg";
import { statistics } from "@/data/about";
import { useCounterAnimation } from "@/composables/useCounterAnimation";

const animateCounter = useCounterAnimation();
const animatedValues = ref(new Array(statistics.length).fill(0));

onMounted(() => {
  statistics.forEach((stat, idx) => {
    animatedValues.value[idx] = animateCounter(stat.value);
  });
});
</script>

<template>
  <div class="my-16">
    <VRow class="mb-16">
      <VCol md="6" class="d-flex align-center justify-center">
        <span
          class="text-h4 text-lg-h2 text-md-h2 text-center text-md-left text-lg-left font-weight-bold"
          >Your Gateway to Local Markets</span
        >
      </VCol>

      <VCol cols="12" md="6" class="pl-lg-10">
        <v-img
          :src="bikeRiders"
          alt="Bike Riders"
          max-height="350"
          class="rounded-lg"
          cover
        ></v-img>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <p class="text-h6 mb-2">
          Welcome to <strong>ethyellow</strong>, your trusted digital directory
          for discovering local businesses and services. Our mission is to
          connect consumers with the best providers in their area, making it
          easier than ever to find reliable information at your fingertips.
        </p>
        <p class="text-h6">
          Whether you're searching for a nearby restaurant, a dependable
          plumber, or a boutique shop, our comprehensive listings are designed
          to provide you with detailed and up-to-date information, including
          contact details, descriptions, photos, and customer reviews. Our
          user-friendly platform ensures a seamless experience, helping you
          navigate through various categories and filters to quickly locate the
          services you need.
        </p>
      </VCol>

      <VCol
        cols="12"
        md="6"
        class="d-flex align-center pa-16 pl-10 text-center"
      >
        <VRow>
          <VCol v-for="(stat, idx) in statistics" cols="6" class="mb-10">
            <div class="stat-box">
              <h1>{{ animatedValues[idx] }}+</h1>
              <p>{{ stat.title }}</p>
            </div>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>

<route lang="yaml">
meta:
  layout: "withnav"
</route>

<style scoped></style>
