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
const default_http_link = createHttpLink({
  uri: import.meta.env.VITE_GRAPH_URL,
});

const default_error_link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors[0].extensions.code === "invalid-jwt") {
    // toast.error("Session Expired! Please Login Again!")
    unset();
    router.replace("/");
    return;
  }
});

const default_auth_link = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  const h = {
    ...headers,
  };


  if (isLoggedIn.value &&  !h['hopt']) {
      h.authorization = `Bearer ${token()}`
  }

  operation.setContext({
    headers: h,
  });

  return forward(operation);
});

const default_apollo_client = new ApolloClient({
  link: from([default_auth_link, default_error_link, default_http_link]),
  cache,
});

export  {
    default_apollo_client,
};
