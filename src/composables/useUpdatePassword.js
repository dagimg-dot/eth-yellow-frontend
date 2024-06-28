import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { mergeErrorsMessage } from "@/utils/errorParser";
import { UPDATE_PASSWORD_MUTATION } from "@/graphql/mutations";

export function useUpdatePassword() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  const { mutate: updatePassword } = useMutation(UPDATE_PASSWORD_MUTATION, {
    onError: (err) => {
      error.value = err;
    },
  });

  const executeUpdatePassword = async ({ currentPassword, newPassword }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await updatePassword({ currentPassword, newPassword });
      const { updatePassword: updatePasswordData } = response.data;
      if (updatePasswordData.errors.length > 0) {
        throw new Error(mergeErrorsMessage(updatePasswordData.errors));
      }

      result.value = updatePasswordData;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    result,
    executeUpdatePassword,
  };
}
