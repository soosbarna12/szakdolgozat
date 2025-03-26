import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { StyledToggleButton, StyledToggleButtonGroup } from '../../../../stlyes/button.style';
import { StyledMenu, StyledMenuItem } from '../../../../stlyes/common.style';
import { Language } from '../../../../types/language.type';
import { TemperatureScale } from '../../../../types/temperatureScale.type';
import { Theme } from '../../../../types/theme.type';
import { ProfileMenuProps } from './ProfileMenu.type';
import { LoginForm } from '../../../AuthenticationForms/LoginForm/LoginForm';


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, isLightTheme, handleSetLightTheme, handleCloseMenu } = props;
  const [openLogin, setOpenLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const handleLoginClick = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => { setOpenLogin(false); };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    handleCloseMenu();
  };

  useEffect(() => {
    const stored = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(stored);
  }, [anchorElUser]);

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
        <StyledToggleButtonGroup onClick={handleCloseMenu} >
          <StyledToggleButton value={TemperatureScale.Celsius} onClick={handleCelsiusScale} >°C </StyledToggleButton>
          < StyledToggleButton value={TemperatureScale.Fahrenheit} onClick={handleFahrenheitScale} >°F </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }

  function renderLanguageToggle() {
    return (
      <Box sx={{ marginTop: "6px" }
      }>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value={Language.English}> EN </StyledToggleButton>
          < StyledToggleButton value={Language.Hungarian} > HU </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }

  function renderThemeToggle() {
    return (
      <Box sx={{ marginTop: "6px" }
      }>
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value={Theme.Light}
            onClick={handleLightModeIconClick}
            disabled={isLightTheme} >
            <LightModeIcon />
          </StyledToggleButton>
          < StyledToggleButton
            value={Theme.Dark}
            onClick={handleDarkModeIconClick}
            disabled={!isLightTheme} >
            <DarkModeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box >
    )
  }

  return (
    <>
      <StyledMenu
        sx={{ marginTop: "53px", padding: "0", borderRadius: "20px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={(event, reason) => handleCloseMenu()} 
      >
        {!loggedIn && (
          <StyledMenuItem onClick={handleLoginClick}>
            <Typography sx={{ textAlign: "center" }}>Log In</Typography>
          </StyledMenuItem>
        )}
        {loggedIn && (
          <>
            <StyledMenuItem onClick={handleCloseMenu}>
              <Typography sx={{ textAlign: "center" }}>Profile</Typography>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleLogout}>
              <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
            </StyledMenuItem>
          </>
        )}
        <Divider />
        {renderTemperatureScaleToggle()}
        {renderLanguageToggle()}
        {renderThemeToggle()}
      </StyledMenu >
      < LoginForm open={openLogin} onClose={() => { setOpenLogin(false); handleCloseMenu(); }} onLoginSuccess={() => setLoggedIn(true)} />
    </>
  )
}
