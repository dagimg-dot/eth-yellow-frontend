import { useMutation } from "@vue/apollo-composable";
import { DELETE_LISTING_MUTATION } from "@/graphql/mutations";
import { ref } from "vue";

export function useDeleteListing() {
  const loading = ref(false);
  const error = ref(null);

  const { mutate: deleteListing } = useMutation(DELETE_LISTING_MUTATION, {
    update: (cache, { data: { delete_businesses_by_pk } }) => {
      console.log(delete_businesses_by_pk);
      if (delete_businesses_by_pk) {
        cache.modify({
          fields: {
            userListings(existingListings = [], { readField }) {
              return existingListings.filter(
                (listing) =>
                  readField("business_id", listing) !==
                  delete_businesses_by_pk.business_id
              );
            },
          },
        });
      }
    },
    onError: (err) => {
      error.value = err;
    },
  });

  const executeDelete = async (business_id) => {
    loading.value = true;
    try {
      await deleteListing({ business_id });
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    executeDelete,
    loading,
    error,
  };
}
