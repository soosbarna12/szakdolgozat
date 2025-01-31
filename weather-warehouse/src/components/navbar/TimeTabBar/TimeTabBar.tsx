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
				sx={{ boxShadow: 2, margin: 1 }}
			>
				{page}
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
