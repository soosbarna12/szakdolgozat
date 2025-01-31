import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { LocationButton } from './LocationSelector/LocationButton/LocationButton';
import { ProfileButton } from './ProfileSettings/ProfileButton/ProfileButton';
import { TimeTabBar } from './TimeTabBar/TimeTabBar';

export function NavBar() {
	return (
		<AppBar position="static" color="transparent" elevation={0}>
			<Toolbar>
				<LocationButton />
				<TimeTabBar />
				<ProfileButton />
			</Toolbar>
		</AppBar>
	);
}
