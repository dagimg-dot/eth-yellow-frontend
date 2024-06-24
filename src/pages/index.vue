<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isNavBarVisible = ref(false);

const handleScroll = () => {
  if (window.scrollY > 100) {
    isNavBarVisible.value = true;
  } else {
    isNavBarVisible.value = false;
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
      <div class="hero">
        <Navigation v-if="isNavBarVisible" />
        <VLayout max-width="1400px" class="mx-auto">
          <Navigation :isLanding="true" />
          <HomeSection />
        </VLayout>
      </div>
      <VLayout max-width="1400px" class="mx-auto d-block pa-4 pa-lg-4">
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
