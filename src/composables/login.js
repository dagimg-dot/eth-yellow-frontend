import { useMutation, provideApolloClient } from "@vue/apollo-composable";
import { defaultApolloClient } from "@/plugins/apollo";
import { ref } from "vue";
import LOGIN_MUTATION from "@/queries/login.gql";

provideApolloClient(defaultApolloClient);

const mergeErrorsMessage = (errors) => {
  const errMessage = "";

  return errors.forEach((err) => {
    errMessage += err + " ";
  });
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
      if (loginData.errors || loginData.message == "Error") {
        throw new Error(mergeErrorsMessage(loginData.errors));
      } else if (loginData.message == "Invalid email or password") {
        throw new Error(loginData.message);
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
