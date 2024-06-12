<script setup></script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-title="Page Not Found ⚠️"
      error-description="We couldn't find the page you are looking for."
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        src="../assets/images/404.png"
        alt="Coming Soon"
        :max-width="500"
        class="mx-auto"
      />
      <VBtn to="/" class="mt-10"> Back to Home </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/scss/misc.scss" as *;
</style>
