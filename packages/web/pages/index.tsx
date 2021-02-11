import { Box, Typography } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useMeQuery } from '../generated/graphql';
import { myMeta } from '../meta';
import { routes } from '../routes';

const Home = () => {
	const router = useRouter();
	const { loading, error, data } = useMeQuery();

	if (loading) {
		return (
			<Box mt={8}>
				<Typography variant='h4' align='center'>
					Loading...
				</Typography>
			</Box>
		);
	}

	if (error || data?.me.errors) {
		router.push(routes.login.path);
		return null;
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
					{data?.me.user &&
						`You're logged in as ${data.me.user.name} (${data.me.user.email})`}
				</Typography>
			</Box>
		</>
	);
};

export default Home;
