import {
  ApolloClient,
  ApolloLink,
  concat,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { message, notification } from "antd";
import { getAccessToken } from "../utils";
console.log(import.meta.env.VITE_GRAPHQL_URI);
const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URI });
console.log({ httpLink });
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case "UNAUTHENTICATED":
            // Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: getNewToken(),
              },
            });
            // Retry the request, returning the new observable
            return forward(operation);
          default:
            notification.error({ message: err });
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      notification.error({ message: networkError.message });
    }
  }
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, concat(authMiddleware, httpLink)]),
});

export default client;
