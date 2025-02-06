import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				color: '#004ba0'
			}
		}
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2', // Blue
			light: '#63a4ff', // Light Blue
			dark: '#004ba0', // Dark Blue
			contrastText: '#fff' // White text
		},
		secondary: {
			main: '#1976d2', // Blue
			light: '#63a4ff', // Light Blue
			dark: '#004ba0', // Dark Blue
			contrastText: '#fff' // White text
		},
		background: {
			default: '#f5f5f5', // Light Gray
			paper: '#fff' // White
		},
		text: {
			primary: '#000', // Black text
			secondary: '#555' // Gray text
		},
		error: {
			main: '#d32f2f' // Red
		},
		warning: {
			main: '#ffa726' // Orange
		},
		info: {
			main: '#0288d1' // Light Blue
		},
		success: {
			main: '#388e3c' // Green
		}
	}
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9', // Light Blue
			light: '#e3f2fd', // Very Light Blue
			dark: '#42a5f5', // Medium Blue
			contrastText: '#000' // Black text
		},
		secondary: {
			main: '#f48fb1', // Pink
			light: '#f8bbd0', // Light Pink
			dark: '#f06292', // Medium Pink
			contrastText: '#000' // Black text
		},
		background: {
			default: '#121212', // Dark Gray/Black
			paper: '#1e1e1e' // Darker Gray/Black
		},
		text: {
			primary: '#ffffff', // White text
			secondary: '#b0bec5' // Light Gray text
		},
		error: {
			main: '#ef5350' // Red
		},
		warning: {
			main: '#ffa726' // Orange
		},
		info: {
			main: '#29b6f6' // Light Blue
		},
		success: {
			main: '#66bb6a' // Green
		}
	}
});
