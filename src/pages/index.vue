<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isNavBarVisible = ref(false);
const heroSection = ref(null);

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const opacity = Math.max(1 - scrollY / (windowHeight * 0.8), 0);

  if (scrollY > 100) {
    isNavBarVisible.value = true;
  } else {
    isNavBarVisible.value = false;
  }

  if (heroSection.value) {
    heroSection.value.style.opacity = opacity.toString();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <VApp>
    <VMain>
      <Navigation v-if="isNavBarVisible" />
      <div class="hero" ref="heroSection">
        <VLayout max-width="1400px" class="mx-auto">
          <Navigation :isLanding="true" />
          <HomeSection />
        </VLayout>
      </div>
      <VLayout max-width="1400px" class="mx-auto d-block pa-4 pa-lg-4">
        <FeatureSection />
        <RecentListings />
        <FooterCTA />
      </VLayout>
    </VMain>
    <Footer />
  </VApp>
</template>

<style scoped>
.hero {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)),
    url("../assets/images/aa_sun_set.jpeg") no-repeat center center;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
}
</style>
