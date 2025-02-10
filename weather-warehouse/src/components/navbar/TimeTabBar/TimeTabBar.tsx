import { Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { TimeTabBarProps } from './TimeTabBar.type';

export function TimeTabBar(_: Readonly<TimeTabBarProps>) {

	function renderMenu() {
		return routes.map((route) => (
			<Button
				component={Link}
				to={route.path}
				key={route.id}
				//onClick={noop}
				//onClick={() => window.open("/" + route.path, )}
				//href={route.path}
				//variant="outlined"
				//color="primary"
				sx={{ boxShadow: 4, margin: 1, borderRadius: 20, width: 150, height: 40, fontWeight: 600, fontSize: 16 }}
			>
				{route.text}
			</Button>
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
