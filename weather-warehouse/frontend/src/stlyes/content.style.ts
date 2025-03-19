import { Box, Paper, styled, TableCell } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { LineChart } from 'recharts';

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

export const StyledItem = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: 'center',
	borderRadius: '20px',
	backgroundColor: theme.palette.background.paper
}));

export const StyledTableContainer = styled(Paper)(() => ({
	borderRadius: 20,
	overflow: "hidden",
	boxShadow: "none",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "1px solid #ccc",
}));

export const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
	fontWeight: 700,
	color: theme.palette.primary.contrastText,
	backgroundColor: theme.palette.primary.dark,
}));

export const StlyedLineChart = styled(LineChart)(({ theme }) => ({
	borderRadius: 20,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(2),
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	borderRadius: 20,
	border: 0,
	'& .MuiDataGrid-columnHeaders': {
	  backgroundColor: theme.palette.primary.main,
	  color: theme.palette.primary.contrastText,
	},
	'& .MuiDataGrid-row:hover': {
	  backgroundColor: theme.palette.action.hover
	},
	'& .MuiDataGrid-columnHeader': {
        backgroundColor: theme.palette.primary.dark,
    }
  }));