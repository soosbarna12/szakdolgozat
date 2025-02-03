import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { ProfileMenuProps } from "./ProfileMenu.type";

const settings = ["Profile", "Logout"];


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { handleCloseUserMenu, anchorElUser } = props;

  return (
    <Menu
      sx={{ mt: "45px" }}
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

      <MenuItem key="language" onClick={handleCloseUserMenu}>
        <ToggleButtonGroup color="primary">
          <ToggleButton value="english">EN</ToggleButton>
          <ToggleButton value="hungarian">HU</ToggleButton>
        </ToggleButtonGroup>
      </MenuItem>

      <MenuItem key="dark-mode" onClick={handleCloseUserMenu}>
        <ToggleButtonGroup color="secondary">
          <ToggleButton value="light-mode">
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value="dark-mode">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </MenuItem>


    </Menu>
  );
}
