import { Box, Typography } from '@material-ui/core';
import Head from 'next/head';

import { useMeQuery } from '../generated/graphql';
import { myMeta } from '../meta';

const Home = () => {
	const { loading, error, data } = useMeQuery();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error!</p>;
	}

	if (data?.me.errors) {
		return (
			<Box mt={8} mx={2}>
				<pre>
					<code>{JSON.stringify(data.me.errors, null, 3)}</code>
				</pre>
			</Box>
		);
	}

	return (
		<>
			<Head>
				<title>Dashboard | {myMeta.title}</title>
			</Head>

			<Box mt={8}>
				<Typography variant='h4' align='center'>
					This is the DASHBOARD page
					<br />
					<br />
					{data?.me.user && `You're logged in as ${data.me.user.name}`}
				</Typography>
			</Box>
		</>
	);
};

export default Home;
