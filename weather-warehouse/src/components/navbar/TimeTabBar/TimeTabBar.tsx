import { Box, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledTimeTabButton } from '../../../common.style';
import { routes } from '../../../routes';

export function TimeTabBar() {

	function renderMenu() {
		return routes.map((route) => (

			<StyledTimeTabButton
				component={Link}
				to={route.path}
				key={route.id}
				sx={{ boxShadow: 4 }}
			>
				{route.text}
			</ StyledTimeTabButton>
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
