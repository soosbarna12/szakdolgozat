import { createTheme } from '@mui/material';

export const greyTheme = createTheme({
	palette: {
		text: {
			primary: '#872341',
			secondary: '#BE3144',
			disabled: '#E17564'
		},
		action: {
			active: '#fff',
			hover: 'rgba(255, 255, 255, 0.08)',
			selected: 'rgba(255, 255, 255, 0.16)',
			disabled: 'rgba(255, 255, 255, 0.3)',
			disabledBackground: 'rgba(255, 255, 255, 0.12)'
		},
		background: {
			default: '##3c3c3c',
			paper: '#fff'
		},
		divider: 'rgba(255, 255, 255, 0.12)'
	}
});

export const darkTheme = createTheme({
	palette: {
		text: {
			primary: '#fff',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(255, 255, 255, 0.5)'
		},
		action: {
			active: '#fff',
			hover: 'rgba(255, 255, 255, 0.08)',
			selected: 'rgba(255, 255, 255, 0.16)',
			disabled: 'rgba(255, 255, 255, 0.3)',
			disabledBackground: 'rgba(255, 255, 255, 0.12)'
		},
		background: {
			default: '#121212',
			paper: '#121212'
		},
		divider: 'rgba(255, 255, 255, 0.12)'
	}
});

export const lightTheme = createTheme({});
