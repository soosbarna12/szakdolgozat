import { CssBaseline, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { LocationButton } from './LocationSelector/LocationButton/LocationButton';
import { NavBarProps } from './NavBar.type';
import { ProfileButton } from './ProfileSettings/ProfileButton/ProfileButton';
import { TimeTabBar } from './TimeTabBar/TimeTabBar';

export function NavBar(props: Readonly<NavBarProps>) {
	const { isLightTheme, handleSetLightTheme } = props;

	return (
		<>
			<CssBaseline /> {/* for admin page, if not resets the theme*/}
			<AppBar
				position="static"
				color="transparent"
				elevation={0}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1000, paddingTop: "8px", paddingBottom: "0px"
				}}
			>
				<Toolbar>
					<LocationButton />
					<TimeTabBar />
					<ProfileButton isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
				</Toolbar>
			</AppBar >
		</>
	);
}
