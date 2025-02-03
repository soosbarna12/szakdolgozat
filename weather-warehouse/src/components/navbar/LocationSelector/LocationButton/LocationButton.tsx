import GlobeIcon from '@mui/icons-material/Public';
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { LocationDrawer } from "./LocationDrawer";


export function LocationButton() {

  const [open, setOpen] = React.useState(false);

  const toggleLocationDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open locations">
        <IconButton
          onClick={toggleLocationDrawer(true)}
          sx={{ p: 0, width: "64px", height: "64px", borderRadius: "50%" }}>
          <GlobeIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Tooltip>
      <LocationDrawer toggleLocationDrawer={toggleLocationDrawer} open={open} />
    </Box >
  );
}
