import { SxProps, Theme } from '@mui/material';

export const typographyStyle: SxProps<Theme> = {
	mr: 2,
	display: { xs: 'none', md: 'flex' },
	fontFamily: 'monospace',
	fontWeight: 600,
	letterSpacing: '.3rem',
	//color: 'primary',
	color: '#fff',
	textDecoration: 'none'
} as const;
