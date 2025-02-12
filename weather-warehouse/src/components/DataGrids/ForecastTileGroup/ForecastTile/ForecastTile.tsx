import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', { backgroundColor: '#1A2027', }),
}));

export default function ForecastPage() {
  return (
    <Box sx={{ flexGrow: 1 }} margin={"10px 200px 0 200px"}>
      <Grid container spacing={12}>
        <Grid size={4}>
          <Item>MON</Item>
        </Grid>
        <Grid size={4}>
          <Item>TUE</Item>
        </Grid>
        <Grid size={4}>
          <Item>WED</Item>
        </Grid>
      </Grid>
    </Box>
  );
}