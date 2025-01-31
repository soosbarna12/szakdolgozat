import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { ProfileMenuProps } from "./ProfileMenu.type";

const settings = ["Profile", "Language", "Logout"];


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { handleCloseUserMenu, anchorElUser } = props;

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}
