import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { ContentBox, StyledItem } from '../../stlyes/content.style';
import { Pages } from '../../types/page.type';


export function HistoricalPage() {
  const [location, setLocation] = React.useState(
    () => localStorage.getItem("location") || ""
  );

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  return (
    <>
      <FilterBar
        type={Pages.Historical}
        location={location}
        onLocationChange={handleLocationChange}
      />

      <ContentBox>
        <Grid container spacing={2}>

          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }} />
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }}>
              <h4>Lorem ipsum</h4>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque hic
                dolorem numquam corrupti? Veritatis ex corporis qui ipsam doloribus
                architecto nisi eum. Possimus a molestias maiores debitis deserunt
                praesentium maxime.
              </Box>
            </StyledItem>
          </Grid>

          <Grid size={{ xs: 6, md: 8 }}>
            <StyledItem sx={{ height: "400px" }} />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <StyledItem sx={{ height: "400px" }} />
          </Grid>

        </Grid>
      </ContentBox>
    </>
  );
}
