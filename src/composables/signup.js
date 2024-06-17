import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import SIGNUP_MUTATION from "@/graphql/mutations/signup.gql";

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

export function useSignup() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  const { mutate: signup } = useMutation(SIGNUP_MUTATION, {
    onError: (err) => {
      error.value = err;
    },
  });

  const executeSignup = async ({ email, username, password }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await signup({
        email,
        username,
        password,
        first_name: "",
        last_name: "",
        phone_number: ""
      });
      const { signup: signupData } = response.data;
      if (signupData.errors.length > 0) {
        throw new Error(mergeErrorsMessage(signupData.errors));
      }

      result.value = signupData;
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
    executeSignup,
  };
}
