import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { provideApolloClient } from "@vue/apollo-composable";
import { defaultApolloClient } from "@/plugins/apollo";

// Provide the default Apollo Client
provideApolloClient(defaultApolloClient);

const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(params: { email: $email, password: $password }) {
      accessToken
      message
      success
      errors {
        message
      }
    }
  }
`;

export function useLogin() {
  const _loading = ref(false);
  const error = ref(null);
  const user = ref(null);

  const login = async ({ email, password }) => {
    error.value = null;

    try {
      const { onResult, onError, loading } = useQuery(LOGIN_QUERY, {
        email,
        password,
      });

      _loading.value = loading;

      return new Promise((resolve, reject) => {
        onResult((result) => {
          if (result.data.login.success) {
            user.value = result.data.login;
            resolve({ success: true, message: result.data.login.message });
          } else {
            error.value = result.data.login.errors || result.data.login.message;
            reject({ success: false, message: result.data.login.message });
          }
        });

        onError((err) => {
          error.value = err;
          reject({ success: false, message: err.message });
        });
      });
    } catch (err) {
      error.value = err;
      return { success: false, message: err.message };
    }
  };

  return {
    login,
    _loading,
    error,
    user,
  };
}
