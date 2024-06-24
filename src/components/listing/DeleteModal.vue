<script setup>
3;
import { DELETE_LISTING_MUTATION } from "@/graphql/mutations";
import { GET_USER_LISTINGS } from "@/graphql/queries";
import { useMutation } from "@vue/apollo-composable";
import { ref, defineEmits, computed } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  listingDetail: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:dialog"]);

const name = ref("");

const closeDialog = () => {
  emit("update:dialog", false);
};

const {
  mutate: deleteBusiness,
  loading,
  onError,
  onDone,
} = useMutation(DELETE_LISTING_MUTATION, {
  context: {
    authRequired: true,
  },
  update: (cache, { data }) => {
    const oldUserListings = cache.readQuery({
      query: GET_USER_LISTINGS,
    });
    console.log("oldUserListings: ", oldUserListings);
    console.log("data: ", data);
    if (data?.delete_businesses_by_pk && oldUserListings) {
      const newListings = oldUserListings.bussinesses.filter(
        (listing) => listing.id !== data.delete_businesses_by_pk.business_id
      );
      cache.writeQuery({
        query: GET_USER_LISTINGS,
        data: {
          businesses: newListings,
        },
      });
    }
  },
});

onDone(() => {
  toast.success("Listing deleted successfully");
  closeDialog();
});

onError(() => {
  toast.error("An error occurred when trying to delete listing");
});

const deleteListing = async () => {
  if (name.value !== props.listingDetail.name || name.value === "") {
    return;
  }
  console.log("Deleting listing: ", props.listingDetail.id);
  await deleteBusiness({
    business_id: props.listingDetail.id,
  });
};

const dialogRef = computed({
  get: () => props.dialog,
  set: (val) => emit("update:dialog", val),
});

const nameRules = [
  (v) => !!v || "Name is required",
  (v) =>
    v === props.listingDetail.name ||
    "Name must be " + props.listingDetail.name,
];
</script>

<template>
  <div class="text-center pa-4">
    <VDialog v-model="dialogRef" width="auto">
      <VCard
        max-width="400"
        prepend-icon="mdi-trash"
        text="Are you sure you want to delete this listing? This action cannot be undone."
        title="Delete Listing"
        class="pa-2"
      >
        <VCardText class="d-flex flex-column ga-2">
          <span
            >Enter "{{ props.listingDetail.name }}" to confirm deletion.
          </span>
          <VTextField v-model="name" label="Business Name" :rules="nameRules" />
        </VCardText>
        <template v-slot:actions>
          <VBtn
            variant="elevated"
            class="ms-auto"
            text="Delete"
            color="error"
            :loading="loading"
            @click="deleteListing"
          />
          <VBtn variante="outlined" text="Cancel" @click="closeDialog" />
        </template>
      </VCard>
    </VDialog>
  </div>
</template>
