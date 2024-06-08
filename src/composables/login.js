import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import LOGIN_MUTATION from "@/graphql/mutations/login.gql";

const mergeErrorsMessage = (errors) => {
  let errMessage = "";

  if (errors.length === 1) {
    return errors[0].message;
  }

  errors.forEach((err) => {
    errMessage += err.message + ", ";
  });

  return errMessage;
};

export function useLogin() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  const { mutate: login } = useMutation(LOGIN_MUTATION, {
    onError: (err) => {
      error.value = err;
    },
  });

  const executeLogin = async ({ email, password }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await login({ email, password });
      const { login: loginData } = response.data;
      if (loginData.errors.length > 0) {
        throw new Error(mergeErrorsMessage(loginData.errors));
      }

      result.value = loginData;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    result,
    executeLogin,
  };
}
