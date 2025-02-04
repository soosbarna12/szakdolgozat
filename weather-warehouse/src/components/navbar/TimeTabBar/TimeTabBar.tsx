import { Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Pages } from '../../../types/pages';
import { noop } from '../../../utils/noop';
import { TimeTabBarProps } from './TimeTabBar.type';

export function TimeTabBar(_: Readonly<TimeTabBarProps>) {
	const pages = Object.values(Pages);

	function renderMenu() {
		return pages.map((page) => (
			<Button
				key={page}
				onClick={noop}
				variant="outlined"
				color="primary"
				sx={{ boxShadow: 4, margin: 1, borderRadius: 50, width: 150, height: 40 }}
			>
				{page}
			</Button>
		));
	}

	return (
		// this sx works
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Toolbar disableGutters>
				<Box>{renderMenu()}</Box>
			</Toolbar>
		</Container>
	);
}
