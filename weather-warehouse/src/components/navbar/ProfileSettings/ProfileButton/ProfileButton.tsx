import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";


export function ProfileButton() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, width: "70px", height: "70px", borderRadius: "50%" }}>
          <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Tooltip>
      <ProfileMenu
        handleCloseUserMenu={handleCloseUserMenu}
        anchorElUser={anchorElUser}
      />
    </Box>
  );
}
