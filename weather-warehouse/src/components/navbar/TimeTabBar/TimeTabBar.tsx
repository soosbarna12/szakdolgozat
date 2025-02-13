import { Box, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledLocationSelectorButton } from '../../../common.style';
import { routes } from '../../../routes';

export function TimeTabBar() {

	function renderMenu() {
		return routes.map((route) => (

			<StyledLocationSelectorButton
				component={Link}
				to={route.path}
				key={route.id}
				sx={{ boxShadow: 4 }}
			>
				{route.text}
			</ StyledLocationSelectorButton>
		));
	}

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Toolbar disableGutters>
				<Box>{renderMenu()}</Box>
			</Toolbar>
		</Container>
	);
}
