import { Box, IconButton, Tooltip } from "@mui/material";
import GlobeIcon from '@mui/icons-material/Public';
import React from "react";

export function LocationButton() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width: "70px", height: "70px", borderRadius: "50%" }}>
            <GlobeIcon sx={{ width: "40px", height: "40px"}} />
          </IconButton>
        </Tooltip>
      </Box>
      
    );
  }