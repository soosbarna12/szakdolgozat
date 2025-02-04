import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { LocationDrawerProps } from "./LocationDrawer.type";

const locations = ["Budapest", "New York", "Berlin"];

export function LocationDrawer(props: Readonly<LocationDrawerProps>) {
  const { toggleLocationDrawer, open } = props;

  function handleDrawerClose() {
    toggleLocationDrawer(false);
  }

  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      elevation={10}
      slotProps={{ backdrop: { style: { opacity: 0.25 } } }}>
      <Box sx={{ width: 300 }} paddingRight={"24px"} paddingLeft={"24px"}>
        <List>
          <Toolbar disableGutters>
            <Tooltip title="Close locations">
              <IconButton
                onClick={handleDrawerClose}
                color='secondary'
                sx={{ padding: 0, margin: "10px", width: "42px", height: "42px", borderRadius: "100%", boxShadow: 4, outline: 1 }}>
                <PlaceOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
              </IconButton>
            </Tooltip>
            <Typography>Saved locations</Typography>
          </Toolbar>

          {locations.map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleDrawerClose}>
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
