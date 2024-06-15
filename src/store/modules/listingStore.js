import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { ref } from "vue";
import CREATE_LISTING_MUTATION from "@/graphql/mutations/createListing.gql";
import { defaultApolloClient } from "@/plugins/apollo";

provideApolloClient(defaultApolloClient);

export const useListingStore = defineStore("listing", () => {
  const listing = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function addListing(listing) {
    loading.value = true;
    error.value = null;

    const { mutate: createListing, error: listingError } = useMutation(
      CREATE_LISTING_MUTATION
    );

    try {
      const response = await createListing({
        owner_id: listing.owner_id,
        name: listing.businessName,
        description: listing.description,
        email: listing.businessEmail,
        phone_number: listing.phoneNumber,
        address: listing.address,
        city: listing.city,
        country: listing.country,
        website: listing.website,
        categoryIds: listing.categories,
        postal_code: listing.postalCode,
        latitude: listing.latitude,
        longitude: listing.longitude,
      });

      const { createListing: listingData } = response.data;
      if (listingData && listingData.errors.length > 0) {
        throw new Error(mergeErrorsMessage(listingData.errors));
      }

      listing.value = listingData;
    } catch (err) {
      error.value = listingError.value || err.message;
      console.log("some error: ", err.message);
    } finally {
      loading.value = false;
    }
  }

  return {
    listing,
    loading,
    error,
    addListing,
  };
});
