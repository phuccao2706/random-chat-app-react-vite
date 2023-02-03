import {
  ApolloClient,
  concat,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
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
            console.log(err);
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, concat(httpLink)]),
});

export default client;
