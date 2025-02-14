import { createTheme } from '@mui/material';

// https://www.hover.dev/css-color-palette-generator
export const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#7c3aed',
			dark: '#5f14e0',
			light: '#9b69f1',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#ed3a51',
			dark: '#e0142f',
			light: '#f1697a',
			contrastText: '#ffffff'
		},
		background: {
			default: '#efecf4',
			paper: '#fbfafc'
		},
		divider: '#ddd7e7',
		text: {
			primary: '#241d30',
			secondary: '#5f4d80',
			disabled: '#8570a9'
		},
		success: {
			main: '#3aed3a',
			contrastText: '#032503'
		},
		warning: {
			main: '#eded3a',
			contrastText: '#252503'
		},
		error: {
			main: '#ed3a3a',
			contrastText: '#ffffff'
		}
	}
});

export const darkTheme = createTheme({
	palette: {
		primary: {
			main: '#7c3aed',
			contrastText: '#ffffff',
			dark: '#5f14e0',
			light: '#9b69f1'
		},
		secondary: {
			main: '#ed3a51',
			contrastText: '#ffffff',
			dark: '#e0142f',
			light: '#f1697a'
		},
		background: {
			default: '#181320',
			paper: '#3c3050'
		},
		divider: '#3c3050',
		text: {
			primary: '#fbfafc',
			secondary: '#d6cfe2',
			disabled: '#a08fbc'
		},
		success: {
			main: '#3aed3a',
			contrastText: '#032503'
		},
		warning: {
			main: '#eded3a',
			contrastText: '#252503'
		},
		error: {
			main: '#ed3a3a',
			contrastText: '#ffffff'
		}
	}
});

export const lightThemeh = createTheme({
	/*components: {
		MuiButtonBase: {
			defaultProps: {
				color: '#004ba0'
			}
		}
	},*/
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
			default: '#808080', //'#f5f5f5', // Light Gray

			paper: '#fff' // white - background color for drawer, menu, etc.
		}
	}
});

export const darkThemeV1 = createTheme({
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
		}
	}
});
