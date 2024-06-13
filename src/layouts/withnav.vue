<template>
  <VApp>
    <VMain>
      <VLayout max-width="1400px" class="mx-auto" height="80">
        <Navigation :isLanding="false" />
      </VLayout>
      <VLayout max-width="1400px" class="mx-auto">
        <RouterView />
      </VLayout>
    </VMain>
  </VApp>
</template>

<style scoped></style>
