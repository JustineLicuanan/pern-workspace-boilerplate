import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { myMeta } from '../meta';
import Copyright from '../components/Copyright';
import NavBar from '../components/NavBar';
import { MeQuery } from '../generated/graphql';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [client, setClient] = useState(
		new ApolloClient({
			uri: myMeta.graphqlEndpoint,
			cache: new InMemoryCache(),
		})
	);

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	useEffect(() => {
		(async () => {
			const cache = new InMemoryCache();
			const cacheItemKey = 'apollo-cache-persist';
			let token;

			const runPersistCache = async () => {
				const persistedCache = localStorage.getItem(cacheItemKey);

				await persistCache({
					cache,
					storage: new LocalStorageWrapper(window.localStorage),
				});

				token = persistedCache
					? (JSON.parse(persistedCache).ROOT_QUERY as MeQuery)?.me?.user?.token
					: '';
			};

			try {
				await runPersistCache();
			} catch (err) {
				localStorage.removeItem(cacheItemKey);
				await runPersistCache();
			}

			setClient(
				new ApolloClient({
					uri: myMeta.graphqlEndpoint,
					cache,
					headers: {
						authorization: token ? `Bearer ${token}` : '',
					},
				})
			);
		})();
	}, []);

	return (
		<ApolloProvider client={client}>
			<Head>
				<title>Home | {myMeta.title}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<NavBar />
			<Component {...pageProps} />
			<Copyright />
		</ApolloProvider>
	);
};

export default MyApp;
