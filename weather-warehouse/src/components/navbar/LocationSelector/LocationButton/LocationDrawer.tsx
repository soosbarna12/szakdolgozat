import GlobeIcon from '@mui/icons-material/Public';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { LocationDrawerProps } from "./LocationDrawer.type";

const locations = ["Budapest", "New York", "Berlin"];

export function LocationDrawer(props: Readonly<LocationDrawerProps>) {
  const { toggleLocationDrawer, open } = props;

  return (
    <Drawer
      open={open}
      onClose={toggleLocationDrawer(false)}
      elevation={10}
      slotProps={{ backdrop: { style: { opacity: 0.25 } } }}>
      <Box sx={{ width: 300 }} paddingRight={"24px"} paddingLeft={"24px"}>
        <List>
          <Toolbar disableGutters>
            <Tooltip title="Close locations">
              <IconButton
                onClick={toggleLocationDrawer(false)}
                sx={{ p: 0, width: "64px", height: "64px", borderRadius: "50%" }}>
                <GlobeIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
            </Tooltip>
            <Typography>Saved locations</Typography>
          </Toolbar>

          {locations.map((text, index) => (
            <ListItem key={text} disablePadding onClick={toggleLocationDrawer(false)}>
              <Button fullWidth variant="text" color="secondary"
                sx={{ boxShadow: 4, margin: 1 }}>
                <ListItemText primary={text} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box >
    </Drawer>

  );
}
