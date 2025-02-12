import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React from "react";
import { StyledMenu, StyledToggleButton, StyledToggleButtonGroup } from '../../../../common.style';
import { ProfileMenuProps } from "./ProfileMenu.type";

const ProfileMenuItems = ["Profile", "Logout"];

export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { disabled, setDisabled, anchorElUser, handleCloseMenu, handleSetTheme } = props;

  function handleLightModeIconClick() {
    props.handleSetTheme(true);
    setDisabled(true);
  }

  function handleDarkModeIconClick() {
    props.handleSetTheme(false);
    setDisabled(true);
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
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value="light"
            onClick={handleLightModeIconClick}
            disabled={disabled}
          >
            <LightModeIcon />
          </StyledToggleButton>
          <StyledToggleButton
            value="dark"
            onClick={handleDarkModeIconClick}
            disabled={disabled}
          >
            <DarkModeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box >
    </StyledMenu >
  )
}
