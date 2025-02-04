import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { LocationDrawer } from "./LocationDrawer";


export function LocationButton() {

  const [open, setOpen] = React.useState(false);

  function toggleLocationDrawer(newOpen: boolean) {
    setOpen(newOpen);
  };

  function handleDrawerOpen() {
    toggleLocationDrawer(true);
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open locations">
        <IconButton
          onClick={handleDrawerOpen}
          color='secondary'
          sx={{ padding: 0, margin: "10px", width: "42px", height: "42px", borderRadius: "100%", boxShadow: 4, outline: 1 }}>
          <PlaceOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
        </IconButton>
      </Tooltip>
      <LocationDrawer toggleLocationDrawer={toggleLocationDrawer} open={open} />
    </Box >
  );
}
