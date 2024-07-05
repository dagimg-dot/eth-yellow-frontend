<script setup>
import { useMutation } from "@vue/apollo-composable";
import { ADD_REVIEW_MUTATION } from "@/graphql/mutations";
import { GET_REVIEWS } from "@/graphql/queries";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";

const reviewForm = reactive({
  comment: "",
  rating: 0,
});

const props = defineProps({
  pageSize: {
    type: Number,
  },
  currentPage: {
    type: Number,
  },
});

const pageSizeRef = ref(() => props.pageSize);
const currentPageRef = ref(() => props.currentPage);

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const {
  mutate: addReview,
  loading: addReviewLoading,
  onError: onAddReviewError,
  onDone: onAddReviewDone,
} = useMutation(ADD_REVIEW_MUTATION, {
  context: {
    authRequired: true,
  },
  update: (cache, { data }) => {
    const oldReview = cache.readQuery({
      query: GET_REVIEWS,
      variables: {
        business_id: route.params.id,
        limit: pageSizeRef.value(),
        offset: (currentPageRef.value() - 1) * pageSizeRef.value(),
      },
    });
    if (data?.insert_reviews_one && oldReview) {
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: {
          business_id: route.params.id,
          limit: pageSizeRef.value(),
          offset: (currentPageRef.value() - 1) * pageSizeRef.value(),
        },
        data: {
          reviews: [
            data.insert_reviews_one,
            ...oldReview.reviews.slice(0, pageSizeRef.value() - 1),
          ],
        },
      });
    }
  },
});

onAddReviewError((error) => {
  console.log(error.message);
  toast.error("Failed to add review");
});

onAddReviewDone(() => {
  toast.success("Review Submitted successfully");
  reviewForm.comment = "";
  reviewForm.rating = 0;
});

const submitReview = async () => {
  if (reviewForm.comment === "" || reviewForm.rating === 0) {
    return;
  }

  if (!isLoggedIn.value) {
    toast.error("You need to login to submit a review");
    router.push(`/auth/login?return_url=${route.fullPath}`);
    return;
  }

  await addReview({
    business_id: route.params.id,
    comment: reviewForm.comment,
    rating: reviewForm.rating,
  });
};
</script>

<template>
  <VCard>
    <VForm @submit.prevent="submitReview">
      <VCardTitle>Submit Your Review</VCardTitle>
      <VCol>
        <VTextarea
          placeholder="Write your review here"
          v-model="reviewForm.comment"
        />
      </VCol>
      <VCol
        class="d-block d-lg-flex d-md-flex justify-md-space-between justify-lg-space-between justify-center"
      >
        <div class="d-flex align-center justify-center ga-4">
          <VRating v-model="reviewForm.rating" />
          <span class="text-h6">{{ reviewForm.rating }} / 5</span>
        </div>
        <VBtn
          class="w-100 w-lg-auto w-md-auto mt-2 mt-lg-0 mt-md-0"
          type="submit"
          :loading="addReviewLoading"
          >Submit</VBtn
        >
      </VCol>
    </VForm>
  </VCard>
</template>

<style scoped></style>
