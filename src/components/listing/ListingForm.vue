<script setup>
import { ref } from "vue";
import ListingRules from "@/utils/listingFormRules";

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
</script>

<template>
  <VForm @submit.prevent="addBusiness" class="mt-10" ref="listingForm">
    <VRow>
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.businessName"
          label="Business Name"
          placeholder="Burger Factory"
          :rules="ListingRules.nameRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.businessEmail"
          label="Business Email"
          type="email"
          placeholder="burger@email.com"
          :rules="ListingRules.emailRules"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VTextarea
          v-model="form.description"
          label="Description"
          placeholder="brief description about the business"
          :rules="ListingRules.descriptionRules"
        />
      </VCol>

      <VCol cols="12" md="6" class="d-flex flex-column ga-4">
        <VTextField
          v-model="form.phoneNumber"
          label="Phone Number"
          placeholder="09........"
          :rules="ListingRules.phoneRules"
        />
        <VTextField
          v-model="form.website"
          label="Website"
          placeholder="If you have a website"
          :rules="ListingRules.websiteRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address"
          label="Address"
          placeholder="Namibia Street"
          :rules="ListingRules.addressRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.city"
          label="City"
          placeholder="Addis Ababa"
          :rules="ListingRules.cityRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.state"
          label="State"
          placeholder="Amhara"
          :rules="ListingRules.stateRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.country"
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

<style scoped></style>
