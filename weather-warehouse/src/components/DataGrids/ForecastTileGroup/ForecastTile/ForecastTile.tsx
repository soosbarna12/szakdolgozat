import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import { StyledForecastTypography, StyledItem } from '../../../../common.style';

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ForecastPage() {
  return (
    <Box sx={{ flexGrow: 1, margin: "10px 200px 0 200px" }}>
      <Grid container columns={7} spacing={2} justifyContent="center" alignItems="center">
        {Days.map((day) => (


          <Grid key={day} size={{ lg: 1 }}>
            <StyledItem elevation={4}>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                <StyledForecastTypography variant='h6' sx={{ textAlign: "center" }}>
                  {day}
                </StyledForecastTypography>
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>

              </Box>
            </StyledItem>
          </Grid>


        ))}
      </Grid>
    </Box>
  );
}