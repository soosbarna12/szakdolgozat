import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React from "react";
import { StyledMenu, StyledToggleButton, StyledToggleButtonGroup } from '../../../../common.style';
import { ProfileMenuProps } from "./ProfileMenu.type";

const ProfileMenuItems = ["Profile", "Logout"];

export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, handleCloseMenu, handleSetTheme } = props;

  function handleLightModeIconClick() {
    handleSetTheme(true);
  }

  function handleDarkModeIconClick() {
    handleSetTheme(false);
  }

  function handleCelsiusScale() {
    handleSetTheme(true);
  }

  function handleFahrenheitScale() {
    handleSetTheme(false);
  }

  return (
    <StyledMenu
      sx={{ marginTop: "53px", padding: "0", borderRadius: "20px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right", }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseMenu}
    >
      {ProfileMenuItems.map((ProfileMenuItems) => (
        <MenuItem key={ProfileMenuItems} onClick={handleCloseMenu}>
          <Typography sx={{ textAlign: "center" }}>{ProfileMenuItems}</Typography>
        </MenuItem>
      ))}

      <Divider />

      <Box>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value="celsius" onClick={handleCelsiusScale}>
            °C
          </StyledToggleButton>
          <StyledToggleButton value="fahrenheit" onClick={handleFahrenheitScale}>
            °F
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value="english">EN</StyledToggleButton>
          <StyledToggleButton value="hungarian">HU</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value="light" onClick={handleLightModeIconClick}>
            <LightModeIcon sx={{ height: "16px" }} />
          </StyledToggleButton>
          <StyledToggleButton value="dark" onClick={handleDarkModeIconClick}>
            <DarkModeIcon sx={{ height: "16px" }} />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box >
    </StyledMenu >
  )
}
