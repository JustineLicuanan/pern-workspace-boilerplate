import { ApolloClient, InMemoryCache } from '@apollo/client';

import { myMeta } from './meta';

export const client = new ApolloClient({
	uri: myMeta.graphqlEndpoint,
	cache: new InMemoryCache(),
});
