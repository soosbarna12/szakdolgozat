import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Drawer, List, ListItem, ListItemText, Skeleton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { StyledButton, StyledIconButton } from '../../../../stlyes/button.style';
import { LocationDrawerProps } from "./LocationDrawer.type";
import { useSavedLocationQuery } from '../../../../hooks/useSavedLocationsQuery';
import { StyledItem } from '../../../../stlyes/content.style';


export function LocationDrawer(props: Readonly<LocationDrawerProps>) {
  const { toggleLocationDrawer, open } = props;
  const { savedLocations, isLoading } = useSavedLocationQuery(open)

  function handleDrawerClose() {
    toggleLocationDrawer(false);
  }

  function renderLocations() {
    if (isLoading) {
      return [0, 1, 2].map((index) => (
        <ListItem key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ borderRadius: "20px" }}
          />
        </ListItem>
      ));
    }
    if (savedLocations?.length > 0) {
      return savedLocations.map(
        (location: { name: string; date: string; dateSaved: string }, index: number) => {
          const filteredDate = new Date(location.date).toLocaleDateString();
          const savedDate = new Date(location.dateSaved).toLocaleDateString();

          return (
            <ListItem key={index} disablePadding onClick={handleDrawerClose}>
              <StyledButton fullWidth variant="text" color="primary" sx={{ height: "80px", boxShadow: 4, margin: 1 }}>
                <ListItemText
                  primary={location.name}
                  secondary={
                    <>
                      <div>Filtered Date: {filteredDate}</div>
                      <div>Saved Date: {savedDate}</div>
                    </>}
                />
              </StyledButton>
            </ListItem>
          );
        }
      );
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
