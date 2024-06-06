import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import useUser from "@/use/user";
import router from "@/router";
import { ApolloLink, from } from "apollo-link";

const { isLoggedIn, token, unset } = useUser();

const cache = new InMemoryCache({
  addTypename: false,
});

// default client
const defaultHttpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPH_URL,
});

const defaultErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors[0].extensions.code === "invalid-jwt") {
    // toast.error("Session Expired! Please Login Again!")
    unset();
    router.replace("/");
    return;
  }
});

const defaultAuthLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  const h = {
    ...headers,
  };

  if (isLoggedIn.value && !h["hopt"]) {
    h.authorization = `Bearer ${token()}`;
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
