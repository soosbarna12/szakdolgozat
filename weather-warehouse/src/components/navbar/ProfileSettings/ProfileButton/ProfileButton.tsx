import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { ProfileButtonProps } from "./ProfileButton.type";


export function ProfileButton(props: Readonly<ProfileButtonProps>) {
  const { handleSetTheme } = props;
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
          color='secondary'
          sx={{ padding: 0, margin: "10px", width: "42px", height: "42px", boxShadow: 4, outline: 1 }}>
          <PersonOutlineOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
        </IconButton>
      </Tooltip>
      <ProfileMenu
        handleSetTheme={handleSetTheme}
        handleCloseUserMenu={handleCloseUserMenu}
        anchorElUser={anchorElUser} />
    </Box>
  );
}
