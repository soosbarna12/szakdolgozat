import { Box, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../consts/routes';
import { StyledTimeTabButton } from '../../../stlyes/button.style';

export function TimeTabBar() {
	const location = useLocation();

	function renderMenu() {
		return ROUTES.map((route) => {
			const isActive = location.pathname === route.path;
			return (
				<StyledTimeTabButton
					component={Link}
					to={route.path}
					key={route.id}
					sx={{ boxShadow: 4 }}
					disabled={isActive}
				>
					{route.text}
				</StyledTimeTabButton>
			);
		});
	}

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Toolbar disableGutters>
				<Box>{renderMenu()}</Box>
			</Toolbar>
		</Container>
	);
}
