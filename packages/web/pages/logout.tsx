import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useLogoutMutation } from '../generated/graphql';
import { routes } from '../routes';

const Logout = () => {
	const router = useRouter();
	const [logoutMutation, { loading }] = useLogoutMutation({
		update(cache) {
			cache.modify({
				fields: {
					me: (_, { DELETE }) => DELETE,
				},
			});
		},
	});

	useEffect(() => {
		(async () => {
			await logoutMutation();
			router.push(routes.login.path);
		})();
	}, []);

	if (loading) {
		return (
			<Box mt={8}>
				<Typography variant='h4' align='center'>
					Logging out...
				</Typography>
			</Box>
		);
	}

	return null;
};

export default Logout;
