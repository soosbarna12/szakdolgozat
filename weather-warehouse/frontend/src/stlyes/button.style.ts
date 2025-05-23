import {
	Button,
	IconButton,
	styled,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	color: theme.palette.primary.contrastText,
	height: '40px',
	margin: '1px',
	borderWidth: 0,
	borderRadius: '20px',
	backgroundColor: theme.palette.primary.dark,
	'&:hover': { backgroundColor: theme.palette.primary.main }
}));

export const StyledTimeTabButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	color: theme.palette.primary.dark,
	width: '150px',
	height: '40px',
	margin: '10px',
	borderRadius: '20px',
	backgroundColor: theme.palette.background.paper,
	'&:hover': { backgroundColor: theme.palette.primary.main }
}));

export const StyledMenuButton = styled(Button)(({ theme }) => ({
	height: 40,
	fontWeight: 600,
	color: theme.palette.text.secondary,
	width: 120,
	margin: 1,
	borderRadius: 20,
	backgroundColor: theme.palette.background.paper,
	'&:hover': { backgroundColor: theme.palette.background.default },
	'&:hover:not(.Mui-focused)': { backgroundColor: theme.palette.primary.main }
}));

export const StyledButton2 = styled(Button)(() => ({
	margin: 1,
	borderRadius: 20,
	width: 150,
	height: 40,
	fontWeight: 600,
	fontSize: 16
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
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
	'&:hover': { backgroundColor: theme.palette.primary.main }
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	borderRadius: '20px',
	width: '48px',
	color: theme.palette.primary.contrastText,
	backgroundColor: theme.palette.primary.dark,
	'&:hover': { backgroundColor: theme.palette.secondary.dark }
}));
