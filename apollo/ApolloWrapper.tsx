'use client';
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

const uri = 'http://localhost:4000/graphql';

const httpLink = createUploadLink({
    uri,
});

const wsLink = new GraphQLWsLink(
    createClient({
        // url: 'wss://api.teal-lotus.com/graphql',
        url: 'ws://localhost:4000/graphql',
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

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://main--time-pav6zq.apollographos.net/graphql',
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      splitLink,
                  ])
                : splitLink,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
