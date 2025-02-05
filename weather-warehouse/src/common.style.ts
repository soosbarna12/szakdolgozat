import {
	Button,
	Menu,
	MenuItem,
	styled,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';

export const StyledIconButton = styled(Button)(({ theme }) => ({
	outline: 1,
	width: '60px',
	height: '60px'
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
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

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	borderRadius: '10px',
	width: '48px'
}));
