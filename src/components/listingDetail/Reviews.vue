<script setup>
import { ADD_REVIEW_MUTATION } from "@/graphql/mutations";
import { GET_REVIEWS } from "@/graphql/queries";
import { useAuthStore } from "@/store/modules/auth";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { formatDistanceToNow, parseISO } from "date-fns";
import gql from "graphql-tag";
import { storeToRefs } from "pinia";
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const reviewForm = reactive({
  comment: "",
  rating: 0,
});

const currentPage = ref(1);
const pageSize = ref(4);

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const GET_TOTAL_REVIEW = gql`
  query GET_TOTAL_REVIEWS {
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const { result: aggregateResult } = useQuery(GET_TOTAL_REVIEW, {
  context: {
    authRequired: false,
  },
});

const resultTotal = computed(
  () => aggregateResult.value?.reviews_aggregate?.aggregate?.count
);

const {
  result,
  loading,
  fetchMore: fetchMoreReviews,
  onError: onFetchReiewError,
} = useQuery(
  GET_REVIEWS,
  {
    business_id: route.params.id,
    limit: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
  },
  {
    context: {
      authRequired: false,
    },
  }
);

const resultData = computed(() => result.value?.reviews);

const fetchNextPage = () => {
  if (
    currentPage.value < 0 ||
    currentPage.value > Math.floor(resultTotal.value / pageSize.value)
  ) {
    return;
  }

  fetchMoreReviews({
    variables: {
      business_id: route.params.id,
      limit: pageSize.value,
      offset: (currentPage.value - 1) * pageSize.value,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prevResult;
      return {
        reviews: fetchMoreResult.reviews,
      };
    },
  });
};

onFetchReiewError(() => {
  toast.error("Failed to fetch reviews");
});

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
        limit: pageSize.value,
        offset: (currentPage.value - 1) * pageSize.value,
      },
    });
    if (data?.insert_reviews_one && oldReview) {
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: {
          business_id: route.params.id,
          limit: pageSize.value,
          offset: (currentPage.value - 1) * pageSize.value,
        },
        data: {
          reviews: [
            data.insert_reviews_one,
            ...oldReview.reviews.slice(0, pageSize.value - 1),
          ],
        },
      });
    }
  },
});

onAddReviewError(() => {
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

const readableDate = (date) => {
  const parsedDate = parseISO(date);
  const formattedDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });

  return formattedDate;
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
  <VDivider />
  <VCardTitle class="mt-4">Other Users Reviews</VCardTitle>
  <div class="pa-4 d-flex flex-column ga-4">
    <VCard v-if="resultData?.length == 0" class="text-center">
      <VCardTitle>No reviews yet</VCardTitle>
    </VCard>
    <VSkeletonLoader
      v-else
      :loading="loading"
      v-for="review in resultData"
      type="list-item-three-line"
      height="187px"
    >
      <VCol class="border rounded-lg">
        <VCard>
          <div class="d-flex ga-4 align-center justify-space-between">
            <VCardTitle class="text-h5">
              {{ review.user.username }}
            </VCardTitle>
            <span class="">
              {{ readableDate(review.updated_at) }}
            </span>
          </div>
          <VRating v-model="review.rating" readonly />
          <VCardText>{{ review.comment }}</VCardText>
        </VCard>
      </VCol>
    </VSkeletonLoader>
    <VCard>
      <VPagination
        v-model="currentPage"
        :length="Math.floor(resultTotal / pageSize)"
        @click="fetchNextPage"
      ></VPagination>
    </VCard>
  </div>
</template>

<style scoped></style>
