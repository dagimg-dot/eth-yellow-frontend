<script></script>

<template>
  <VFooter dark padless class="mt-16 px-8 pt-8">
    <VCard flat tile width="100%" class="">
      <VLayout max-width="1400px" class="mx-auto mb-6">
        <VRow class="d-flex justify-center">
          <VCol
            cols="12"
            sm="6"
            md="3"
            class="d-flex flex-column justify-md-center justify-lg-center ga-8"
          >
            <CompanyCard />
            <div class="text-left">
              <VBtn icon="mdi-facebook" class="ml-0" variant="text" />
              <VBtn icon="mdi-twitter" class="mx-2" variant="text" />
              <VBtn icon="mdi-linkedin" class="mx-2" variant="text" />
              <VBtn icon="mdi-instagram" class="mx-2" variant="text" />
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3">
            <VCardTitle class="pl-0 font-weight-bold">Quick Links</VCardTitle>
            <div class="d-flex flex-column ga-4 mt-4">
              <RouterLink to="/" class="text-decoration-none">Home</RouterLink>
              <RouterLink to="/listings" class="text-decoration-none"
                >Listings</RouterLink
              >
              <RouterLink to="/services" class="text-decoration-none"
                >Services</RouterLink
              >
              <RouterLink to="/contact" class="text-decoration-none"
                >Contact</RouterLink
              >
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3">
            <VCardTitle class="pl-0 font-weight-bold">Join Us</VCardTitle>
            <div class="d-flex flex-column ga-4 mt-4">
              <RouterLink to="/auth/login" class="text-decoration-none"
                >Login</RouterLink
              >
              <RouterLink to="/auth/signup" class="text-decoration-none"
                >Sign Up</RouterLink
              >
              <RouterLink to="/listings/add" class="text-decoration-none"
                >Add Your Bussiness</RouterLink
              >
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3">
            <VCardTitle class="pl-0 font-weight-bold">Contact Us</VCardTitle>
            <VList class="d-flex flex-column ga-6 mt-4">
              <div class="d-flex ga-4 align-center">
                <VIcon>mdi-map-marker</VIcon>
                <VListItemTitle class="text-wrap"
                  >Namibia St, Robel Plaza, Addis Ababa</VListItemTitle
                >
              </div>
              <div class="d-flex ga-4 align-center">
                <VIcon>mdi-phone</VIcon>
                <VListItemTitle>(+251) 906 290 648</VListItemTitle>
              </div>
              <div class="d-flex ga-4 align-center">
                <VIcon>mdi-email</VIcon>
                <VListItemTitle>
                  <a href="mailto:ethyellow@gmail.com">ethyellow@gmail.com</a>
                </VListItemTitle>
              </div>
            </VList>
          </VCol>
        </VRow>
      </VLayout>
      <VDivider />
      <div class="text-center my-2">
        <span>&copy; {{ new Date().getFullYear() }} ethyellow. All Rights Reserved.</span>
      </div>
    </VCard>
  </VFooter>
</template>

<style scoped>
.list-wrapper {
  display: flex;
}
</style>
