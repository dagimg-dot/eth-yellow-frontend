<script setup></script>

<template>
  <section
    class="d-flex justify-center align-center font-weight-bold h-screen mx-sm-auto text-sm-center"
  >
    <VContainer class="d-flex flex-column justify-center align-center ga-11">
      <h1
        class="font-weight-bold text-lg-h1 text-md-h1 text-sm-h2 text-h3 animate-fade-in-top"
      >
        Your Go-To Local Business Directory
      </h1>
      <p class="text-lg-h5 text-md-h5 text-sm-h6 animate-fade-in-top">
        Welcome to ethyellow, your ultimate local business directory. we have
        the most comprehensive and up-to-date listings to help you find exactly
        what you need.
      </p>
      <SearchBar class="animate-fade-in-top" />
    </VContainer>
  </section>
</template>

<style scoped lang="scss">
@use "@/scss/animation.scss" as *;

section {
  color: #dddf00;
}
</style>
