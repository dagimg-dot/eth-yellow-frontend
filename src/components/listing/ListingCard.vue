<script setup>
import avatar from "../../assets/images/fill_form3.jpg";
import { ref } from "vue";
import { useRouter } from "vue-router";

const isLiked = ref(false);
const deleteDialogVisible = ref(false);
const router = useRouter();

const trimText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const props = defineProps({
  listing: {
    business_id: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    locations: Array,
  },
  loading: {
    type: Boolean,
  },
  isAllowed: {
    type: Boolean,
  },
});

const emit = defineEmits(["delete"]);

const goToDetialsPage = (ev) => {
  if (
    ev.target.nodeName == "BUTTON" ||
    ev.target.nodeName == "svg" ||
    ev.target.nodeName == "path"
  )
    return;

  router.push(`/listings/${props.listing.business_id}`);
};

const listingDetail = {
  name: props.listing.name,
  id: props.listing.business_id,
};
</script>

<template>
  <VSkeletonLoader :loading="props.loading" type="image, article">
    <VCard
      class="w-100 cursor-pointer card-hover-effect"
      @click="goToDetialsPage"
      hover
    >
      <VImg :src="avatar" height="200px" cover />

      <VCardItem>
        <VCardTitle>{{ props.listing.name }}</VCardTitle>
      </VCardItem>

      <VCardText class="d-flex flex-column ga-2 w-100">
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex ga-4 flex-column">
            <p class="font-weight-medium text-base d-flex ga-1 align-center">
              <VIcon icon="bx-map" />
              <span>{{
                `${props.listing.locations[0].city}, ${props.listing.locations[0].country}`
              }}</span>
            </p>
            <p class="mb-0">
              {{ trimText(props.listing.description, 90) }}
            </p>
          </div>
          <div v-if="props.isAllowed" class="d-flex flex-column">
            <VBtn
              icon="bx-edit"
              variant="text"
              :to="`/listings/edit/${props.listing.business_id}`"
            />
            <VBtn
              icon="bx-trash"
              variant="text"
              color="error"
              @click="deleteDialogVisible = true"
            />
          </div>
          <VBtn
            v-if="!props.isAllowed"
            :icon="isLiked ? 'iconamoon-like-fill' : 'iconamoon-like-light'"
            size="large"
            @click="isLiked = !isLiked"
            variant="text"
          />
        </div>
      </VCardText>
      <DeleteModal
        :dialog="deleteDialogVisible"
        :listingDetail="listingDetail"
        @update:dialog="deleteDialogVisible = $event"
      />
    </VCard>
  </VSkeletonLoader>
</template>

<style scoped>
.card-hover-effect {
  transition: all 0.3s ease-in-out;
}

.card-hover-effect:hover {
  transform: scale(1.05);
}
</style>
