<template>
  <VApp>
    <VMain>
      <Navigation :isLanding="false" />
      <VLayout max-width="1400px" class="mx-auto pa-6 pa-lg-0 mt-6">
        <RouterView />
      </VLayout>
    </VMain>
  </VApp>
</template>

<style scoped></style>
