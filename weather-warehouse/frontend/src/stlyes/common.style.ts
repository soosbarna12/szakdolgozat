import { Dialog, Menu, MenuItem, styled, Typography } from '@mui/material';

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
	mt: '300px',
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
