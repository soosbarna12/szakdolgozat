import { CssBaseline, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { LocationButton } from './LocationSelector/LocationButton/LocationButton';
import { ProfileButton } from './ProfileSettings/ProfileButton/ProfileButton';
import { TimeTabBar } from './TimeTabBar/TimeTabBar';

export function NavBar() {
	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				color="transparent"
				elevation={1}
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1000, paddingTop: "8px", paddingBottom: "8px" }}
			>
				<Toolbar>
					<LocationButton />
					<TimeTabBar />
					<ProfileButton />
				</Toolbar>
			</AppBar>
		</>
	);
}
