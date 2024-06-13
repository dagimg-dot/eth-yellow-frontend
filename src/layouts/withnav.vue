<template>
  <VApp>
    <VMain>
      <VLayout max-width="1400px" class="mx-auto h-screen">
        <Navigation :isLanding="false" />
        <RouterView />
      </VLayout>
    </VMain>
  </VApp>
</template>
