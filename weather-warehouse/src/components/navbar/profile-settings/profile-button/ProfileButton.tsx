import { Box, IconButton, Tooltip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { ProfileMenu } from "../profile-menu/ProfileMenu";

export function ProfileButton() {
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
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircleIcon/>
          </IconButton>
        </Tooltip>
        <ProfileMenu handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser}/>
      </Box>
      
    );
  }