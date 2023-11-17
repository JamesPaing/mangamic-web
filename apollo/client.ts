import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { HttpLink } from '@apollo/client';
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { getUri, getWsUrl } from '@/utils/getApiUrl';

const httpLink = createUploadLink({
    uri: getUri(),
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: getWsUrl(),
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);

        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    // @ts-ignore
    httpLink
);

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: splitLink,
    });
});
