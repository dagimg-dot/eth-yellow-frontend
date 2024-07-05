<script setup>
import { formatDistanceToNow, parseISO } from "date-fns";
import { ref } from "vue";

const props = defineProps({
  review: {
    type: Object,
  },
});

const isReadMore = ref(() => props.review.comment.length > 200);

const readableDate = (date) => {
  const parsedDate = parseISO(date);
  const formattedDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });

  return formattedDate;
};
</script>

<template>
  <VCol class="border rounded-lg">
    <VCard>
      <div class="d-flex ga-4 align-center justify-space-between">
        <VCardTitle class="text-h5">
          {{ props.review.user.username }}
        </VCardTitle>
        <span class="">
          {{ readableDate(props.review.updated_at) }}
        </span>
      </div>
      <VRating v-model="props.review.rating" readonly />
      <VCardText
        >{{
          props.review.comment.length > 200 && isReadMore
            ? `${props.review.comment.slice(0, 200)}...`
            : props.review.comment
        }}
        <span
          v-if="props.review.comment.length > 200"
          @click="isReadMore = !isReadMore"
          class="text-decoration-underline cursor-pointer"
          >{{ isReadMore ? "read more" : "read less" }}</span
        >
      </VCardText>
    </VCard>
  </VCol>
</template>

<style scoped></style>
