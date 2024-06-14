import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import router from "@/router";
import { ApolloLink, from } from "apollo-link";
import { useAuthStore } from "@/store/modules/auth";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";

const cache = new InMemoryCache({
  addTypename: false,
});

// default client
const defaultHttpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPH_URL,
});

const defaultErrorLink = onError(({ graphQLErrors, networkError }) => {
  const authStore = useAuthStore();

  if (graphQLErrors && graphQLErrors[0].extensions.code === "invalid-jwt") {
    toast.error("Session Expired! Please Login Again!");
    authStore.logout();
    router.replace("/");
    return;
  }

  if (networkError) {
    toast.error("Network Error! Please try again later.");
  }
});

const defaultAuthLink = new ApolloLink((operation, forward) => {
  const authStore = useAuthStore();

  const { headers } = operation.getContext();

  const h = {
    ...headers,
  };

  const { isLoggedIn, token } = storeToRefs(authStore);

  if (isLoggedIn.value && !h["hopt"]) {
    h.authorization = `Bearer ${token.value}`;
  }

  operation.setContext({
    headers: h,
  });

  return forward(operation);
});

const defaultApolloClient = new ApolloClient({
  link: from([defaultAuthLink, defaultErrorLink, defaultHttpLink]),
  cache,
});

export { defaultApolloClient };
