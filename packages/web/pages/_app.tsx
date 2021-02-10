import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';

import { myMeta } from '../meta';
import Copyright from '../components/Copyright';
import NavBar from '../components/NavBar';
import { client } from '../client';

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<ApolloProvider client={client}>
			<Head>
				<title>Dashboard | {myMeta.title}</title>
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
