import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Divider, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { ProfileMenuProps } from "./ProfileMenu.type";

const settings = ["Profile", "Logout"];


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { handleCloseUserMenu, anchorElUser } = props;

  return (

    <Menu
      sx={{ mt: "45px", padding: "0", borderRadius: "20px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right", }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
        </MenuItem>
      ))}

      <Divider />

      <MenuItem key="language" onClick={handleCloseUserMenu}>
        <ToggleButtonGroup color="primary" sx={{ padding: 0, height: "30px" }}>
          <ToggleButton value="english" sx={{ width: "50px", paddingLeft: 2, paddingRight: 2, borderRadius: "10px" }}>EN</ToggleButton>
          <ToggleButton value="hungarian" sx={{ width: "50px", paddingLeft: 2, paddingRight: 2, borderRadius: "10px" }}>HU</ToggleButton>
        </ToggleButtonGroup>
      </MenuItem>

      <MenuItem key="dark-mode" onClick={handleCloseUserMenu}>
        <ToggleButtonGroup color="secondary" sx={{ padding: 0, height: "30px" }}>
          <ToggleButton value="light-mode" sx={{ width: "50px", paddingLeft: 2, paddingRight: 2, borderRadius: "10px" }}>
            <LightModeIcon sx={{ height: "16px" }} />
          </ToggleButton>
          <ToggleButton value="dark-mode" sx={{ width: "50px", paddingLeft: 2, paddingRight: 2, borderRadius: "10px" }}>
            <DarkModeIcon sx={{ height: "16px" }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </MenuItem>
    </Menu >
  );
}
