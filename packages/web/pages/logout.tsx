import { Box, Typography } from '@material-ui/core';
import Head from 'next/head';

import { myMeta } from '../meta';

const Logout = () => {
	return (
		<>
			<Head>
				<title>Logout | {myMeta.title}</title>
			</Head>

			<Box mt={8}>
				<Typography variant='h4' align='center'>
					This is Client's LOGOUT route
				</Typography>
			</Box>
		</>
	);
};

export default Logout;
