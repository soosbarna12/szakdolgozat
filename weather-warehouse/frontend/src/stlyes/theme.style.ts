import { createTheme } from '@mui/material';


// V2 https://www.w3schools.com/w3css/w3css_color_generator.asp
// V3 https://uicolors.app/create
export const lightTheme = createTheme({
	// hide scrollbar
	components: {
		MuiCssBaseline: {
		  styleOverrides: {
			html: {
				'& ::-webkit-scrollbar': {
					display: 'none'
				},
			}
		  }
		}
	},

	palette: {
		primary: {
			light: '#a9ebf0',
			main: '#20a9ba',
			dark: '#1e6e80',
			contrastText: '#ffffff'
		},
		secondary: {
			light: '#d5f6f8',
			main: '#3bc5d5',
			dark: '#c9c9c9', // menu item hover
			contrastText: '#000000'
		},
		background: {
			default: '#efefef', // background
			paper: '#e3e1e1 ' // floating object background
		},
		text: {
			primary: '#0f323d',
			secondary: '#0f323d', //'#1d889d',
			disabled: '#204c59'
		}
	}
});

// V3 https://uicolors.app/create
export const darkTheme = createTheme({
	// hide scrollbar
	components: {
		MuiCssBaseline: {
		  styleOverrides: {
			html: {
				'& ::-webkit-scrollbar': {
					display: 'none'
				},
			}
		  }
		}
	},
	
	palette: {
		primary: {
			light: '#a9ebf0',
			main: '#20a9ba',
			dark: '#1e6e80',
			contrastText: '#ffffff'
		},
		secondary: {
			light: '#d5f6f8',
			main: '#3bc5d5',
			dark: '#37373b', // menu item hover
			contrastText: '#000000'
		},
		background: {
			default: '#0e0e10', // background
			paper: '#28282b' // floating object background ('#18181a')
		},
		text: {
			primary: '#dbf9ff',
			secondary: '#dbf9ff'
		}
	}
});
