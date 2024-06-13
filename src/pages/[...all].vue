<script setup></script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-title="Page Not Found ⚠️"
      error-description="We couldn't find the page you are looking for."
    />

    <!-- 👉 Image -->
    <div class="misc-avatar text-center d-flex flex-column align-center">
      <img src="../assets/images/404.png" alt="404" class="mx-auto" />
      <VBtn to="/" class="mt-10" max-width="200px"> Back to Home </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/scss/misc.scss" as *;
</style>
