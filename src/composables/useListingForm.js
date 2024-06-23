import { ref, computed, watch, watchEffect } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { GET_LISTINGS } from "@/graphql/queries";
import { CREATE_LISTING_MUTATION } from "@/graphql/mutations";
import { UPDATE_LISTING_MUTATION } from "@/graphql/mutations";
import { parseErrorMessage } from "@/utils/errorParser";
import { useReverseGeoCode } from "@/composables/useReverseGeoCode";
import { locateUser } from "@/utils/geoLocation";
import { useCategories } from "@/composables/useCategories";
import { useRoute } from "vue-router";

export function useListingForm(props, isEditModeRef) {
  const isEditMode = computed(() => isEditModeRef.value);
  const route = useRoute();
  console.log(route.params.id)

  const form = ref({
    name: props.business?.name || "",
    email: props.business?.email || "",
    description: props.business?.description || "",
    phone_number: props.business?.phone_number || "",
    website: props.business?.website || "",
    isAddressFetched: false,
    address: props.business?.address || "",
    city: props.business?.city || "",
    latitude: props.business?.latitude || "",
    longitude: props.business?.longitude || "",
    postal_code: props.business?.postal_code || "",
    categories: props.business?.categories || [],
    country: props.business?.country || "",
    images: props.business?.images || [],
  });

  const isAddressFetchedRef = computed(() => form.value.isAddressFetched);

  const listingForm = ref(null);

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const resetForm = () => {
    form.value = {};
  };

  const getChoosenCategoriesID = () => {
    return isEditMode.value
      ? categories.value
          .filter((category) => form.value.categories.includes(category.name))
          .map((category) => ({
            business_id: route.params.id,
            category_id: category.category_id,
          }))
      : categories.value
          .filter((category) => form.value.categories.includes(category.name))
          .map((category) => ({
            category_id: category.category_id,
          }));
  };

  const { fetchCategories, categories, categoryLoading } = useCategories();

  const {
    mutate: addListing,
    loading: createLoading,
    onError: onCreateError,
    onDone: onCreateDone,
  } = useMutation(CREATE_LISTING_MUTATION, {
    context: {
      authRequired: true,
    },
    update: (cache, { data }) => {
      const oldListings = cache.readQuery({ query: GET_LISTINGS });
      if (data?.insert_businesses_one && oldListings) {
        cache.writeQuery({
          query: GET_LISTINGS,
          data: {
            businesses: [
              data.insert_businesses_one,
              ...cache.readQuery({ query: GET_LISTINGS }).businesses,
            ],
          },
        });
      }
    },
  });

  onCreateError((error) => {
    const parsedError = parseErrorMessage(error.message);
    toast.error(parsedError);
  });

  onCreateDone(() => {
    toast.success("Business added successfully");
    resetForm();
  });

  const {
    mutate: updateListing,
    loading: updateLoading,
    onError: onUpdateError,
    onDone: onUpdateDone,
  } = useMutation(UPDATE_LISTING_MUTATION, {
    context: {
      authRequired: true,
    },
    /*     update: (cache, { data }) => {
      const oldListings = cache.readQuery({ query: GET_LISTINGS });
      if (data?.update_businesses_by_pk && oldListings) {
        const updatedListing = data.update_businesses_by_pk;
        const updatedListings = oldListings.businesses.map((listing) =>
          listing.id === updatedListing.id ? updatedListing : listing
        );
        cache.writeQuery({
          query: GET_LISTINGS,
          data: {
            businesses: updatedListings,
          },
        });
      }
    }, */
  });

  onUpdateError((error) => {
    const parsedError = parseErrorMessage(error.message);
    toast.error(parsedError);
  });

  onUpdateDone(() => {
    toast.success("Business updated successfully");
  });

  const addBusiness = async () => {
    const { valid } = await listingForm.value.validate();

    if (!valid || form.value.categories.length === 0) {
      return;
    }

    const business = {
      owner_id: user.value.user_id,
      business_id: route.params.id,
      ...form.value,
      categoryIds: getChoosenCategoriesID(),
    };

    console.log(getChoosenCategoriesID());
    console.log(categories.value)

    if (isEditMode.value) {
      console.log("Update Listing");
      console.log(business);
      await updateListing(business);
    } else {
      await addListing(business);
    }
  };

  const {
    locate,
    result,
    loading: locationLoading,
    error,
    abort,
  } = useReverseGeoCode();

  const getLocation = () => {
    form.value.isAddressFetched = !form.value.isAddressFetched;
  };

  watch(isAddressFetchedRef, () => {
    if (isAddressFetchedRef.value) {
      locateUser(locate);
    } else {
      abort();
      form.value.address = "";
      form.value.city = "";
      form.value.country = "";
      form.value.longitude = "";
      form.value.latitude = "";
    }
  });

  watchEffect(() => {
    if (result.value) {
      form.value.address =
        result.value.address.road ||
        "Unable to find address, please enter manually";

      form.value.latitude = result.value.lat;
      form.value.longitude = result.value.lon;

      form.value.city =
        result.value.address.city ||
        result.value.address.state ||
        "Unable to find city, please enter manually";

      form.value.country =
        result.value.address.country ||
        "Unable to find country, please enter manually";
    }

    if (error.value) {
      toast.error(error.value);
      error.value = null;
    }
  });

  return {
    form,
    isEditMode,
    listingForm,
    categories,
    categoryLoading,
    updateLoading,
    createLoading,
    locationLoading,
    fetchCategories,
    getLocation,
    addBusiness,
    resetForm,
  };
}
