import { CssBaseline, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { LocationButton } from './LocationSelector/LocationButton/LocationButton';
import { NavBarProps } from './NavBar.type';
import { ProfileButton } from './ProfileSettings/ProfileButton/ProfileButton';
import { TimeTabBar } from './TimeTabBar/TimeTabBar';
import { useLocation } from 'react-router-dom';

export function NavBar(props: Readonly<NavBarProps>) {
	const { isLightTheme, handleSetLightTheme } = props;
	const location = useLocation();
	const isHistoricalPage = location.pathname.toLowerCase().includes('historical');

	return (
		<>
			<CssBaseline data-testid="cssBaseline" />
			<AppBar
				data-testid="appBar"
				position="static"
				color="transparent"
				elevation={0}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1000, paddingTop: "8px", paddingBottom: "0px"
				}}
			>
				<Toolbar data-testid="toolbar">
					{isHistoricalPage && <LocationButton />}
					<TimeTabBar />
					<ProfileButton isLightTheme={isLightTheme} handleSetLightTheme={handleSetLightTheme} />
				</Toolbar>
			</AppBar >
		</>
	);
}
