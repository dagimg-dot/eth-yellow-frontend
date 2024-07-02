<script setup>
import { useListing } from "@/composables/useListing";
import avatar from "../../assets/images/avatar.png";
import bgImage from "../../assets/images/fill_form3.jpg";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const { listing, listingLoading } = useListing(route.params.id);

const descRef = ref(null);
const locRef = ref(null);
const contactRef = ref(null);
const reviewRef = ref(null);

const changeHash = (hash) => {
  switch (hash) {
    case "description":
      descRef.value?.scrollIntoView({ behavior: "smooth" });
      break;
    case "location":
      locRef.value?.scrollIntoView({ behavior: "smooth" });
      break;
    case "contact":
      contactRef.value?.scrollIntoView({ behavior: "smooth" });
      break;
    case "reviews":
      reviewRef.value?.scrollIntoView({ behavior: "smooth" });
      break;
    default:
      break;
  }
};

const isLiked = ref(false);
const activeTab = ref(route.hash);

const tabs = [
  {
    title: "Description",
    icon: "bx-message-square-detail",
    tab: "description",
  },
  {
    title: "Location",
    icon: "lucide-locate-fixed",
    tab: "location",
  },
  {
    title: "Contact",
    icon: "ic-outline-contact-support",
    tab: "contact",
  },
  {
    title: "Reviews",
    icon: "bx-star",
    tab: "reviews",
  },
];
</script>

<template>
  <VCol class="pa-0">
    <VSkeletonLoader :loading="listingLoading" type="card-avatar, actions">
      <VCard class="w-100">
        <VImg :src="bgImage" max-height="350px" cover />

        <VCardText class="position-relative">
          <VAvatar size="150" class="avatar-center" :image="avatar" />

          <div
            class="d-flex justify-space-between align-end flex-wrap info-wrapper"
          >
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0 text-h6 text-lg-h4 text-md-h4">
                {{ listing.name }}
              </VCardTitle>
              <VCardSubtitle class="pa-0 d-flex ga-2 align-center">
                <VIcon icon="bx-map" size="32"></VIcon>
                <span class="text-caption text-lg-h5">
                  {{
                    `${listing.locations?.[0]?.city}, ${listing.locations?.[0]?.country}`
                  }}
                </span>
              </VCardSubtitle>
            </div>
            <VBtn
              :icon="isLiked ? 'iconamoon-like-fill' : 'iconamoon-like-light'"
              size="x-large"
              @click="isLiked = !isLiked"
              variant="text"
            />
          </div>
        </VCardText>
      </VCard>
    </VSkeletonLoader>
    <VCard>
      <VTabs v-model="activeTab" show-arrows>
        <VTab
          v-for="item in tabs"
          :key="item.icon"
          :value="item.tab"
          @click="changeHash(item.tab)"
        >
          <VIcon size="20" start :icon="item.icon" />
          {{ item.title }}
        </VTab>
      </VTabs>
    </VCard>
    <VDivider />
    <section ref="descRef">
      <VCard>
        <VCardTitle class="text-h5 font-weight-bold"> Description </VCardTitle>
        <VCardText class="text-body text-lg-h6 text-md-h6">
          {{ listing.description }}
        </VCardText>
      </VCard>
    </section>
    <section ref="locRef">
      <VCard>
        <VCardTitle class="text-h5 font-weight-bold"> Location </VCardTitle>
        <div
          class="pa-4 overflow-auto d-lg-flex d-md-flex ga-4 justify-space-between d-block"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43109.46404148012!2d6.139331415419217!3d47.52221401973193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47928c21dbead7ab%3A0x409ce34b30f0970!2s70230%20Filain!5e0!3m2!1sen!2sfr!4v1640189073328!5m2!1sen!2sfr"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            class="w-100 w-lg-50 w-md-50"
          ></iframe>
          <VCol class="d-flex flex-column ga-10">
            <span class="text-h6 mb-4 text-center d-block font-weight-bold"
              >More info</span
            >
            <div class="d-flex justify-space-between">
              <div class="text-lg-h6 text-md-h6">Address</div>
              <div class="text-lg-h6 text-md-h6">
                {{ listing.locations?.[0]?.address }}
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="text-lg-h6 text-md-h6">City</div>
              <div class="text-lg-h6 text-md-h6">
                {{ listing.locations?.[0]?.city }}
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="text-lg-h6 text-md-h6">Country</div>
              <div class="text-lg-h6 text-md-h6">
                {{ listing.locations?.[0]?.country }}
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="text-lg-h6 text-md-h6">Postal Code</div>
              <div class="text-lg-h6 text-md-h6">
                {{ listing.locations?.[0]?.postal_code }}
              </div>
            </div>
          </VCol>
        </div>
      </VCard>
    </section>
    <section ref="contactRef">
      <VCard>
        <VCardTitle class="text-h5 font-weight-bold"> Contact </VCardTitle>
        <VCol
          class="d-md-flex d-lg-flex ga-16 flex-column flex-lg-row flex-md-row"
        >
          <VCard class="d-flex ga-2 flex-column w-100 align-center mt-4">
            <VIcon icon="bx-phone" size="24" />
            <span class="text-lg-h6 text-md-h6">
              {{ listing.contact_details?.[0]?.phone_number }}</span
            >
          </VCard>
          <VCard class="d-flex ga-2 flex-column w-100 align-center mt-4">
            <VIcon icon="bx-mail-send" size="24" />
            <span class="text-lg-h6 text-md-h6">{{
              listing.contact_details?.[0]?.email
            }}</span>
          </VCard>
          <VCard class="d-flex ga-2 flex-column w-100 align-center mt-4">
            <VIcon icon="bx-globe" size="24" />
            <span class="text-lg-h6 text-md-h6">{{
              listing.contact_details?.[0]?.website
            }}</span>
          </VCard>
        </VCol>
      </VCard>
    </section>
    <section ref="reviewRef">
      <VCard>
        <VCardTitle class="text-h5 font-weight-bold"> Reviews </VCardTitle>
      </VCard>
    </section>
  </VCol>
</template>

<route lang="yaml">
meta:
  layout: withnav
</route>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -4rem;
  inset-inline-start: 1rem;
}

.info-wrapper {
  margin-top: 100px;
}

section {
  scroll-margin-top: 100px;
}

@media (max-width: 768px) {
  .avatar-center {
    inset-block-start: -3rem;
    inset-inline-start: 1rem;
    max-width: 100px;
    max-height: 100px;
  }

  .info-wrapper {
    margin-top: 50px;
  }
}
</style>
