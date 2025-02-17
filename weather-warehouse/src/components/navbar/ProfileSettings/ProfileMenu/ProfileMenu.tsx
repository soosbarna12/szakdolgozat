import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React from "react";
import { StyledToggleButton, StyledToggleButtonGroup } from '../../../../stlyes/button.style';
import { StyledMenu } from '../../../../stlyes/common.style';
import { Language } from '../../../../types/language.type';
import { ProfileMenuItem } from '../../../../types/profileMenuItem.type';
import { TemperatureScale } from '../../../../types/temperatureScale.type';
import { Theme } from '../../../../types/theme.type';
import { LoginForm } from '../../../LoginForm/LoginForm';
import { ProfileMenuProps } from "./ProfileMenu.type";


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, isLightTheme, handleCloseMenu, handleSetLightTheme } = props;
  const [openLogin, setOpenLogin] = React.useState(false);
  const profileMenuItems = Object.values(ProfileMenuItem);

  function handleLoginClick() {
    setOpenLogin(true);
  }

  function handleCloseLogin() {
    setOpenLogin(false);
  }

  function handleCelsiusScale() {
  }

  function handleFahrenheitScale() {
  }

  function handleLightModeIconClick() {
    handleSetLightTheme(true);
  }

  function handleDarkModeIconClick() {
    handleSetLightTheme(false);
  }

  function renderTemperatureScaleToggle() {
    return (
      <Box>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value={TemperatureScale.Celsius} onClick={handleCelsiusScale}>°C</StyledToggleButton>
          <StyledToggleButton value={TemperatureScale.Fahrenheit} onClick={handleFahrenheitScale}>°F</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }

  function renderLanguageToggle() {
    return (
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value={Language.English}>EN</StyledToggleButton>
          <StyledToggleButton value={Language.Hungarian}>HU</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }

  function renderThemeToggle() {
    return (
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value={Theme.Light}
            onClick={handleLightModeIconClick}
            disabled={isLightTheme} >
            <LightModeIcon />
          </StyledToggleButton>
          <StyledToggleButton
            value={Theme.Dark}
            onClick={handleDarkModeIconClick}
            disabled={!isLightTheme} >
            <DarkModeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box >
    )
  }

  function renderMenuItems() {
    return profileMenuItems.map((profileMenuItem, index) => (
      <MenuItem key={profileMenuItem + index} onClick={handleCloseMenu}>
        <Typography sx={{ textAlign: "center" }}>{profileMenuItem}</Typography>
      </MenuItem>))
  }

  return (
    <>
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
        <MenuItem onClick={handleLoginClick}>
          <Typography sx={{ textAlign: "center" }}>Log In</Typography>
        </MenuItem>

        {renderMenuItems()}

        <Divider />

        {renderTemperatureScaleToggle()}
        {renderLanguageToggle()}
        {renderThemeToggle()}
      </StyledMenu >
      <LoginForm open={openLogin} onClose={handleCloseLogin} />
    </>
  )
}
