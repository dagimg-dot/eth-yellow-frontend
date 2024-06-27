<template>
  <VApp>
    <VMain class="d-flex align-center justify-center">
      <Navigation />
      <RouterView />
    </VMain>
    <VCard>
      <VDivider />
      <div class="text-center my-2 pa-2">
        <span
          >&copy; {{ new Date().getFullYear() }} ethyellow. All Rights
          Reserved.</span
        >
      </div>
    </VCard>
  </VApp>
</template>
