import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Divider, Typography } from "@mui/material";
import React from "react";
import { StyledMenu, StyledMenuItem, StyledToggleButton, StyledToggleButtonGroup } from './ProfileMenu.style';
import { ProfileMenuProps } from "./ProfileMenu.type";

const ProfileMenuItems = ["Profile", "Logout"];

export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, handleCloseUserMenu, handleSetTheme } = props;

  function handleLightModeIconClick() {
    handleSetTheme(true);
  }

  function handleDarkModeIconClick() {
    handleSetTheme(false);
  }

  return (
    <StyledMenu
      sx={{ mt: "45px", padding: "0", borderRadius: "20px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right", }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {ProfileMenuItems.map((ProfileMenuItems) => (
        <StyledMenuItem key={ProfileMenuItems} onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: "center" }}>{ProfileMenuItems}</Typography>
        </StyledMenuItem>
      ))}

      <Divider />

      <StyledMenuItem key="language" onClick={handleCloseUserMenu}>
        <StyledToggleButtonGroup color="primary">
          <StyledToggleButton value="english">EN</StyledToggleButton>
          <StyledToggleButton value="hungarian">HU</StyledToggleButton>
        </StyledToggleButtonGroup>
      </StyledMenuItem>


      <StyledMenuItem key="theme-toggle" onClick={handleCloseUserMenu}>
        <StyledToggleButtonGroup color="secondary" >
          <StyledToggleButton value="light" onClick={handleLightModeIconClick}>
            <LightModeIcon sx={{ height: "16px" }} />
          </StyledToggleButton>
          <StyledToggleButton value="dark" onClick={handleDarkModeIconClick}>
            <DarkModeIcon sx={{ height: "16px" }} />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </StyledMenuItem>
    </StyledMenu >
  );
}
