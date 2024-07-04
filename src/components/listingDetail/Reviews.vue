<script setup>
import { GET_REVIEWS } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const currentPage = ref(1);
const pageSize = ref(4);

const route = useRoute();

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

const prevData = ref(null);

const fetchNextPage = () => {
  if (prevData.value === currentPage.value) return;
  prevData.value = currentPage.value;
  fetchMoreReviews({
    variables: {
      business_id: route.params.id,
      limit: pageSize.value,
      offset: (currentPage.value - 1) * pageSize.value,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prevResult;
      if (fetchMoreResult.reviews.length < pageSize.value) {
        return {
          reviews: [
            ...fetchMoreResult.reviews,
            ...prevResult.reviews.slice(
              0,
              pageSize.value - fetchMoreResult.reviews.length
            ),
          ],
        };
      }
      return {
        reviews: [...fetchMoreResult.reviews],
      };
    },
  });
};

onFetchReiewError(() => {
  toast.error("Failed to fetch reviews");
});
</script>

<template>
  <ReviewForm :pageSize="pageSize" :currentPage="currentPage" />
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
      <ReviewCard :review="review" />
    </VSkeletonLoader>
    <VPagination
      v-model="currentPage"
      :length="Math.floor(resultTotal / pageSize)"
      @click="fetchNextPage"
      class="mt-4"
    ></VPagination>
  </div>
</template>

<style scoped></style>
