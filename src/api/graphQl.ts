import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setContext } from "@apollo/client/link/context";

namespace GraphQl {
  const cache = new InMemoryCache();
  const httpLink = createHttpLink({
    uri: "/graphql/query",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  export async function query(requestQuery: string, data: any) {
    const response = await client.query({
      query: gql(requestQuery),
      variables: data,
    });

    return response;
  }

  export async function mutation(requestQuery: string, data: any) {
    const response = await client.mutate({
      mutation: gql(requestQuery),
      variables: data,
    });

    return response;
  }
}

export default GraphQl;
