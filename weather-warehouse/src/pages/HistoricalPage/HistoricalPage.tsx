import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import { StyledItem } from '../../common.style';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { Pages } from '../../types/pages';

export function HistoricalPage() {
  return (
    <>
      <FilterBar type={Pages.Historical} />
      <Box sx={{ flexGrow: 1 }} margin={"10px 200px 0 200px"}>
        <Grid container spacing={2} >
          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem>xs=6 md=8</StyledItem>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem>xs=6 md=4</StyledItem>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem>xs=6 md=4</StyledItem>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem>xs=6 md=8</StyledItem>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}
