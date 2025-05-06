import DeleteIcon from '@mui/icons-material/Delete';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Skeleton, Toolbar, Tooltip, Typography } from "@mui/material";
import dayjs from 'dayjs';
import React, { useContext } from "react";
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';
import { useDeleteLocationQuery } from '../../../../hooks/useDeleteLocationQuery';
import { useSavedLocationQuery } from '../../../../hooks/useSavedLocationsQuery';
import { StyledButton, StyledIconButton } from '../../../../stlyes/button.style';
import { LocationDrawerProps } from "./LocationDrawer.type";


export function LocationDrawer(props: Readonly<LocationDrawerProps>) {
  const { toggleLocationDrawer, open } = props;
  const { savedLocations, isLoading, refetch } = useSavedLocationQuery(open);
  const { mutateAsync: deleteLocation } = useDeleteLocationQuery();
  const { setHistoricalPageData, setLocation } = useContext(HistoricalContext);


  function handleDrawerClose() {
    toggleLocationDrawer(false);
  }

  function handleOpenSavedLocation(index: number) {
    if (!savedLocations) return;
    setHistoricalPageData(savedLocations[index].locationData);
    setLocation({ name: "", lat: 0, lon: 0 });
  }

  function handleDeleteLocation(userLocationID: number, event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    deleteLocation(userLocationID).then(() => { refetch() });
  }

  function renderLocations() {
    if (isLoading) {
      return [0, 1, 2].map((index) => (
        <ListItem key={index} data-testid="locationDrawerSkeleton">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ borderRadius: "20px" }}
          />
        </ListItem>
      ));
    }

    if (savedLocations && savedLocations?.length > 0) {
      return savedLocations.map((arrayElement, index) => {
        return (
          <ListItem key={index} disablePadding onClick={() => handleOpenSavedLocation(index)} data-testid="savedLocation">
            <StyledButton fullWidth variant="text" color="primary" sx={{ height: "100px", boxShadow: 4, margin: 1 }} >
              <ListItemText
                primary={arrayElement?.locationData?.at(-1)?.cityName}
                secondary={
                  <>
                    <span>Filtered Date: {arrayElement?.locationData?.at(-1)?.date}</span>
                    <span>Saved Date: {dayjs(arrayElement.dateSaved).format("YYYY-MM-DD")}</span>
                  </>}
              />
            </StyledButton>
            <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => handleDeleteLocation(arrayElement.userLocationID, event)}
                sx={{ marginLeft: 1 }}
                data-testid="deleteButton"
              >
                <DeleteIcon />
              </IconButton>
          </ListItem >
        )
      });
    }

    return <Typography>No saved locations found.</Typography>
  }


  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      elevation={4}
      slotProps={{ backdrop: { style: { opacity: 1 } } }}>
      <Box sx={{ width: 300 }} paddingRight={"10px"} paddingLeft={"24px"} paddingTop={"8px"}>
        <List sx={{ padding: 0 }}>
          <Toolbar disableGutters>
            <Tooltip title="Close locations">
              <StyledIconButton
                onClick={handleDrawerClose}
                sx={{
                  padding: 0, margin: "10px", width: "48px", height: "48px",
                  borderRadius: "100%", boxShadow: 4, outline: 0
                }}>
                <PlaceOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
              </StyledIconButton>
            </Tooltip>
            <Typography variant="body1" textTransform={"uppercase"}>Saved locations</Typography>
          </Toolbar>
          {renderLocations()}
        </List>
      </Box >
    </Drawer>
  );
}
