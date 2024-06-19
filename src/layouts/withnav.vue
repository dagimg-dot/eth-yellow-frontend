<template>
  <VApp>
    <VMain>
      <Navigation :isLanding="false" />
      <VLayout max-width="1400px" class="mx-auto pa-6 pa-lg-4 mt-0 mt-lg-6">
        <RouterView />
      </VLayout>
    </VMain>
  </VApp>
</template>

<style scoped></style>
