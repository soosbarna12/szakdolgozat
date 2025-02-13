import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Tooltip } from "@mui/material";
import React from "react";
import { StyledIconButton } from '../../../../common.style';
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
        <StyledIconButton
          onClick={handleDrawerOpen}
          sx={{ boxShadow: 4 }}>
          <PlaceOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
        </StyledIconButton>
      </Tooltip>
      <LocationDrawer toggleLocationDrawer={toggleLocationDrawer} open={open} />
    </Box >
  );
}
