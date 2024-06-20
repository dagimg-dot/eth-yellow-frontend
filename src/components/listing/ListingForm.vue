<script setup>
import ListingRules from "@/utils/listingFormRules";
import { useListingForm } from "@/composables/useListingForm";

const props = defineProps({
  business: {
    business_id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    description: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    categories: {
      type: Array,
    },
  },
});

const {
  form,
  isEditMode,
  listingForm,
  categories,
  categoryLoading,
  createLoading,
  locationLoading,
  fetchCategories,
  getLocation,
  addBusiness,
  resetForm,
} = useListingForm(props);
</script>

<template>
  <VForm @submit.prevent="addBusiness" class="mt-10" ref="listingForm">
    <VRow>
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.name"
          prepend-inner-icon="bx-building"
          label="Business Name"
          placeholder="Burger Factory"
          :rules="ListingRules.nameRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.email"
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
          :rules="ListingRules.phone_number"
        />
      </VCol>

      <VCol cols="12" md="6" class="d-flex flex-column ga-4">
        <VTextField
          v-model="form.phone_number"
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
        <VCheckbox
          v-model="form.isAddressFetched"
          label="Insert address based on your current location"
          @click="getLocation"
        />
        <VTextField
          class="mt-4"
          v-model="form.address"
          prepend-inner-icon="mdi-map-marker"
          :loading="locationLoading"
          label="Address"
          placeholder="Namibia Street"
          :rules="ListingRules.addressRules"
        />
      </VCol>

      <VCol cols="12" md="6" class="d-flex align-end">
        <VTextField
          v-model="form.city"
          prepend-inner-icon="mdi-city"
          :loading="locationLoading"
          label="City"
          placeholder="Addis Ababa"
          :rules="ListingRules.cityRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.latitude"
          prepend-inner-icon="mdi-latitude"
          :loading="locationLoading"
          label="Latitude"
          :rules="ListingRules.coordinatesRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.longitude"
          prepend-inner-icon="mdi-longitude"
          :loading="locationLoading"
          label="Longitude"
          :rules="ListingRules.coordinatesRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.country"
          prepend-inner-icon="mdi-earth"
          :loading="locationLoading"
          label="Country"
          placeholder="Ethiopia"
          :rules="ListingRules.countryRules"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.postal_code"
          prepend-inner-icon="mdi-mailbox"
          label="Postal Code"
          placeholder="6003"
          :rules="ListingRules.postalCodeRules"
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
        <VCombobox
          v-model="form.categories"
          clearable
          chips
          label="Categories"
          placeholder="Choose a category . . ."
          hint="You can select multiple categories by typing and selecting from the list"
          prepend-inner-icon="mdi-category"
          :loading="categoryLoading"
          :items="categories.map((category) => category.name)"
          @focus="fetchCategories()"
          multiple
          :rules="ListingRules.categoryRules"
        />
      </VCol>

      <VCol cols="12" class="d-flex ga-4 justify-end">
        <VBtn type="reset" color="secondary" variant="tonal" @click="resetForm">
          Reset
        </VBtn>
        <VBtn type="submit" :loading="createLoading">
          {{ isEditMode ? "Update" : "Publish" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<style scoped></style>
