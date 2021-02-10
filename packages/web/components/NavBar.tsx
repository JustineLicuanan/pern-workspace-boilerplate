import { useState, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useRouter } from 'next/router';

import { myMeta } from '../meta';
import Link from './Link';
import { routes } from '../routes';

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			flexGrow: 1,
		},
		title: {
			flexGrow: 1,
		},
	});
});

const NavBar = () => {
	const router = useRouter();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (url?: string) => {
		setAnchorEl(null);
		url && router.push(url);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Container>
					<Toolbar>
						<Typography variant='h6' className={classes.title}>
							<Link
								href={routes.dashboard.path}
								color='inherit'
								underline='none'
							>
								{myMeta.title}
							</Link>
						</Typography>
						<div>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={() => handleClose()}
							>
								<MenuItem onClick={() => handleClose(routes.register.path)}>
									Register
								</MenuItem>
								<MenuItem onClick={() => handleClose(routes.login.path)}>
									Login
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default NavBar;
