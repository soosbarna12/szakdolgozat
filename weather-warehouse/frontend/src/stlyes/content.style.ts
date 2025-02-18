import { Box, Paper, styled } from '@mui/material';

export const ContentBox = styled(Box)`
	flex-grow: 1;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2px;
	width: 98%;

	@media (min-width: 600px) {
		width: 95%;
	}

	@media (min-width: 900px) {
		width: 90%;
	}

	@media (min-width: 1200px) {
		width: 80%;
	}

	@media (min-width: 1536px) {
		width: 75%;
	}
`;

//
export const StyledItem = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: 'center',
	borderRadius: '20px',
	backgroundColor: theme.palette.background.paper
}));
