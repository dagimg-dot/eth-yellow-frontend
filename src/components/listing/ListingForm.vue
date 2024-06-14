<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import ListingRules from "@/utils/listingFormRules";
import { useReverseGeoCode } from "@/composables/reverseGeoCode";
import { locateUser } from "@/utils/geoLocation";
import { toast } from "vue3-toastify";

const props = defineProps({
  business: {
    businessId: {
      type: String,
    },
    businessName: {
      type: String,
    },
    businessEmail: {
      type: String,
    },
  },
});

const isEditMode = props.business?.businessId !== undefined;

const form = ref({
  businessName: props.business?.businessName || "",
  businessEmail: props.business?.businessEmail || "",
  description: "",
  phoneNumber: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "",
  images: [],
});

const addressRef = computed(() => form.value.address);

const listingForm = ref(null);

const resetForm = () => {
  form.value = {};
};

const addBusiness = async () => {
  const { valid } = await listingForm.value.validate();

  if (!valid) {
    return;
  }

  console.log(form.value);
};

const { locate, result, loading, error, abort } = useReverseGeoCode();

watchEffect(() => {
  if (result.value) {
    form.value.address =
      result.value.address.road ||
      "Unable to find address, please enter manually";

    form.value.city =
      result.value.address.city ||
      result.value.address.state ||
      "Unable to find city, please enter manually";

    form.value.country =
      result.value.address.country ||
      "Unable to find country, please enter manually";

    form.value.state =
      result.value.address.state_district ||
      result.value.address.state ||
      "Unable to find state, please enter manually";
  }

  if (error.value) {
    toast.error(error.value);
    error.value = null;
  }
});

watch(addressRef, () => {
  if (addressRef.value !== "") {
    abort();
  } else {
    locateUser();
  }
});
</script>

<template>
  <VForm @submit.prevent="addBusiness" class="mt-10" ref="listingForm">
    <VRow>
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.businessName"
          prepend-inner-icon="bx-building"
          label="Business Name"
          placeholder="Burger Factory"
          :rules="ListingRules.nameRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.businessEmail"
          prepend-inner-icon="mdi-email"
          label="Business Email"
          type="email"
          placeholder="burger@email.com"
          :rules="ListingRules.emailRules"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VTextarea
          v-model="form.description"
          prepend-inner-icon="bx-message-square-detail"
          label="Description"
          placeholder="brief description about the business"
          :rules="ListingRules.descriptionRules"
        />
      </VCol>

      <VCol cols="12" md="6" class="d-flex flex-column ga-4">
        <VTextField
          v-model="form.phoneNumber"
          prepend-inner-icon="bx-phone"
          label="Phone Number"
          placeholder="09........"
          :rules="ListingRules.phoneRules"
        />
        <VTextField
          v-model="form.website"
          prepend-inner-icon="bx-globe"
          label="Website"
          placeholder="If you have a website"
          :rules="ListingRules.websiteRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address"
          hint="Click on the map icon to fill your current location"
          prepend-inner-icon="mdi-map-marker"
          @click:prepend-inner="locateUser(locate)"
          :loading="loading"
          label="Address"
          placeholder="Namibia Street"
          :rules="ListingRules.addressRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.city"
          prepend-inner-icon="mdi-city"
          label="City"
          placeholder="Addis Ababa"
          :rules="ListingRules.cityRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.state"
          prepend-inner-icon="mdi-city-variant"
          label="State"
          placeholder="Amhara"
          :rules="ListingRules.stateRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.country"
          prepend-inner-icon="mdi-earth"
          label="Country"
          placeholder="Ethiopia"
          :rules="ListingRules.countryRules"
        />
      </VCol>

      <VCol>
        <VFileInput
          prepend-icon=""
          prepend-inner-icon="bx-camera"
          label="Upload Images"
          multiple
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.postalCode"
          prepend-inner-icon="mdi-mailbox"
          label="Postal Code"
          placeholder="6003"
          :rules="ListingRules.postalCodeRules"
        />
      </VCol>

      <VCol cols="12" class="d-flex ga-4">
        <VBtn type="submit"> {{ isEditMode ? "Update" : "Publish" }} </VBtn>
        <VBtn type="reset" color="secondary" variant="tonal" @click="resetForm">
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<style scoped>
.prepend-inner-icon {
  cursor: pointer;
}
</style>
