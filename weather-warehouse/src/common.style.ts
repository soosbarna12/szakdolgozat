import {
	Button,
	Dialog,
	IconButton,
	Menu,
	MenuItem,
	OutlinedInput,
	Paper,
	styled,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export const StyledMenu = styled(Menu)(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: '20px'
	},
	mt: '45px',
	padding: '0',
	borderRadius: '20px'
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: '20px'
	},
	mt: '45px',
	padding: '0',
	borderRadius: '20px'
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	borderRadius: '10px',
	selected: false,
	autoFocus: false
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
	({ theme }) => ({
		paddingLeft: 16,
		paddingRight: 16,
		height: '30px'
	})
);

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
	padding: 0,
	margin: '10px',
	width: '48px',
	height: '48px',
	outline: 0,
	color: theme.palette.primary.contrastText,
	backgroundColor: theme.palette.primary.dark,
	'&:hover': { backgroundColor: theme.palette.primary.light }
}));

//
export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	border: '1',
	borderColor: theme.palette.primary.main,
	borderRadius: '20px',
	width: '48px',
	color: theme.palette.primary.main
}));

export const StyledButton2 = styled(Button)(({ theme }) => ({
	margin: 1,
	borderRadius: 20,
	width: 150,
	height: 40,
	fontWeight: 600,
	fontSize: 16
})) as typeof Button;

//
export const StyledForecastTypography = styled(Typography)(({ theme }) => ({
	variants: 'h6',
	fontSize: '18px',
	textAlign: 'center',
	padding: '8px',
	color: theme.palette.primary.contrastText,
	backgroundColor: theme.palette.primary.main,
	borderRadius: '20px'
}));

//
export const StyledItem = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: 'center',
	borderRadius: '20px',
	backgroundColor: theme.palette.background.paper
}));

//
export const StyledButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	color: theme.palette.primary.contrastText,
	height: '40px',
	margin: '1px',
	borderWidth: 0,
	borderRadius: '20px',
	backgroundColor: theme.palette.primary.dark,
	'&:hover': { backgroundColor: theme.palette.primary.light }
})) as typeof Button;

// FINAL
export const StyledTimeTabButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	color: theme.palette.primary.contrastText,
	width: '150px',
	height: '40px',
	margin: '10px',
	borderRadius: '20px',
	backgroundColor: theme.palette.primary.dark,
	'&:hover': { backgroundColor: theme.palette.primary.light }
})) as typeof Button;

// FINAL
export const StyledMenuButton = styled(Button)(({ theme }) => ({
	height: 40,
	fontWeight: 600,
	color: theme.palette.text.secondary,
	width: 120,
	margin: 1,
	borderRadius: 20,
	backgroundColor: theme.palette.background.paper,
	'&:hover': { backgroundColor: theme.palette.background.default }
}));

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
			borderColor: theme.palette.primary.main
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
		borderColor: theme.palette.background.paper,
		border: 0
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.background.paper,
		borderWidth: '2px'
	},
	'&:hover:not(.Mui-focused)': {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.primary.main
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
			borderColor: theme.palette.primary.main
		}
	}
}));
