import { CssBaseline, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { LocationButton } from './LocationSelector/LocationButton/LocationButton';
import { NavBarProps } from './NavBar.type';
import { ProfileButton } from './ProfileSettings/ProfileButton/ProfileButton';
import { TimeTabBar } from './TimeTabBar/TimeTabBar';

export function NavBar(props: Readonly<NavBarProps>) {
	const { handleSetTheme } = props;

	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				color="transparent"
				elevation={0}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1000, paddingTop: "8px", paddingBottom: "0px",
					//background: 'linear-gradient( #004ba0, #f5f5f5)',
					//background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				}}
			>
				<Toolbar>
					<LocationButton />
					<TimeTabBar />
					<ProfileButton handleSetTheme={handleSetTheme} />
				</Toolbar>
			</AppBar >
		</>
	);
}
