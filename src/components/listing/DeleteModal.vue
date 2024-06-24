<script setup>
import { useDeleteListing } from "@/composables/useDeleteListing";
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
const { executeDelete, loading, error } = useDeleteListing();

const name = ref("");

const closeDialog = () => {
  emit("update:dialog", false);
};

const deleteListing = async () => {
  if (name.value !== props.listingDetail.name || name.value === "") {
    return;
  }
  console.log("Deleting listing: ", props.listingDetail.id);

  try {
    await executeDelete(props.listingDetail.id);

    toast.success("Listing deleted successfully");
    closeDialog();
  } catch (err) {
    toast.error("An error occurred when trying to delete listing");
  }
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
    <VDialog v-model="dialogRef" width="auto"
      >s
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
