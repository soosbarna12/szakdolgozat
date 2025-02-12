import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { ProfileButtonProps } from "./ProfileButton.type";


export function ProfileButton(props: Readonly<ProfileButtonProps>) {
  const { isLightTheme, handleSetLightTheme } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorElUser(null);
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenMenu}
          //color='secondary'
          sx={{ padding: 0, margin: "10px", width: "48px", height: "48px", boxShadow: 4, outline: 0 }}>
          <PersonOutlineOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
        </IconButton>
      </Tooltip>
      <ProfileMenu
        isLightTheme={isLightTheme}
        handleSetLightTheme={handleSetLightTheme}
        handleCloseMenu={handleCloseMenu}
        anchorElUser={anchorElUser} />
    </Box>
  );
}
