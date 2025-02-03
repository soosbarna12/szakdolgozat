import GlobeIcon from '@mui/icons-material/Public';
import { Box, Button, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { LocationDrawerProps } from "./LocationDrawer.type";

const locations = ["Budapest", "New York", "Berlin"];

export function LocationDrawer(props: Readonly<LocationDrawerProps>) {
  const { toggleLocationDrawer } = props;

  return (
    <Box sx={{ width: 300 }}>
      <List>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }} />
          <IconButton
            onClick={toggleLocationDrawer(false)}
            sx={{ p: 0, width: "70px", height: "70px", borderRadius: "50%" }}>
            <GlobeIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
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
  );
}
