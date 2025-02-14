import { OutlinedInput, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// default border color, dark mode too much color
export const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
	height: '40px',
	margin: '5px',
	color: theme.palette.text.secondary,
	borderWidth: '2px',
	borderRadius: '20px',
	borderColor: theme.palette.primary.main,
	backgroundColor: theme.palette.background.default,
	'& .MuiInputBase-root': {
		borderRadius: '20px',
		borderColor: theme.palette.background.paper,
		borderWidth: '2px'
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.background.paper,
		borderWidth: '2px'
	},
	'&:hover:not(.Mui-focused)': {
		'& .MuiOutlinedInput-notchedOutline': {
			//borderColor: theme.palette.primary.main
			borderColor: theme.palette.primary.light
		}
	}
}));

// hover bgcolor too dark, dark mode too much color
export const StyledLocationSearch = styled(OutlinedInput)(({ theme }) => ({
	height: '40px',
	margin: '5px',
	color: theme.palette.text.secondary,
	border: 0,
	borderRadius: '20px',
	borderColor: theme.palette.primary.main,
	backgroundColor: theme.palette.background.paper,
	'& .MuiInputBase-root': {
		borderRadius: '20px',
		//borderColor: theme.palette.background.paper,
		borderColor: theme.palette.background.paper,
		border: 0
	},
	'& .MuiOutlinedInput-notchedOutline': {
		//borderColor: theme.palette.background.paper,
		borderColor: theme.palette.background.paper,
		borderWidth: '2px'
	},
	'&:hover:not(.Mui-focused)': {
		'& .MuiOutlinedInput-notchedOutline': {
			//borderColor: theme.palette.primary.main
			borderColor: theme.palette.primary.light
		}
	}
}));

// dark mode too much color
export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
	width: '170px',
	height: '40px',
	margin: '10px',
	color: theme.palette.text.secondary,
	border: 0,
	borderRadius: '20px',
	backgroundColor: theme.palette.background.paper,

	'& .MuiInputBase-root': {
		border: 0,
		borderRadius: '20px',
		borderColor: theme.palette.background.paper
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderWidth: '2px',
		borderColor: theme.palette.background.paper
	},
	'&:hover:not(.Mui-focused)': {
		'& .MuiOutlinedInput-notchedOutline': {
			//borderColor: theme.palette.primary.main
			borderColor: theme.palette.primary.light
		}
	}
}));
