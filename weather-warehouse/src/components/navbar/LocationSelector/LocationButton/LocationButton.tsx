import GlobeIcon from '@mui/icons-material/Public';
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
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
          sx={{ p: 0, width: "70px", height: "70px", borderRadius: "50%" }}>
          <GlobeIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Tooltip>
      <Drawer
        //sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open} onClose={toggleLocationDrawer(false)}
        slotProps={{ backdrop: { style: { opacity: 0.25 } } }} elevation={10}>
        <LocationDrawer toggleLocationDrawer={toggleLocationDrawer} />
      </Drawer>
    </Box >
  );
}
