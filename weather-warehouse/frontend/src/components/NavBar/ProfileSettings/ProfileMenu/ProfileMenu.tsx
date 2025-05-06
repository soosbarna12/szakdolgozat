import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';
import { StyledToggleButton, StyledToggleButtonGroup } from '../../../../stlyes/button.style';
import { StyledMenu, StyledMenuItem } from '../../../../stlyes/common.style';
import { TemperatureScale } from '../../../../types/temperatureScale.type';
import { Theme } from '../../../../types/theme.type';
import { LoginForm } from '../../../AuthenticationForms/LoginForm/LoginForm';
import { ProfileMenuProps } from './ProfileMenu.type';


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, isLightTheme, handleSetLightTheme, handleCloseMenu } = props;
  const [openLogin, setOpenLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const { temperatureScale, setTemperatureScale } = useContext(HistoricalContext);
  const { setLocation, setHistoricalPageData } = useContext(HistoricalContext);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, [anchorElUser]);

  async function handleLoginClick() {
    setOpenLogin(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLocation({ name: "", lat: 0, lon: 0 });
    setHistoricalPageData([]);
    setLoggedIn(false);
    handleCloseMenu();
    window.location.reload();
  }

  function handleCelsiusScale() {
    setTemperatureScale(JSON.stringify(TemperatureScale.Celsius));
  }

  function handleFahrenheitScale() {
    setTemperatureScale(JSON.stringify(TemperatureScale.Fahrenheit));
  }

  function handleLightModeIconClick() {
    handleSetLightTheme(true);
  }

  function handleDarkModeIconClick() {
    handleSetLightTheme(false);
  }

  function handleLoginSuccess() {
    setLoggedIn(true);
  }

  function handleCloseLoginForm() {
    setOpenLogin(false);
    handleCloseMenu();
  }

  function renderTemperatureScaleToggle() {
    return (
      <Box>
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value={TemperatureScale.Celsius}
            onClick={handleCelsiusScale}
            disabled={temperatureScale === TemperatureScale.Celsius}>
            °C
          </StyledToggleButton>
          <StyledToggleButton
            value={TemperatureScale.Fahrenheit}
            onClick={handleFahrenheitScale}
            disabled={temperatureScale === TemperatureScale.Fahrenheit}>
            °F
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    );
  }

  function renderThemeToggle() {
    return (
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value={Theme.Light}
            onClick={handleLightModeIconClick}
            data-testid="lightModeButton"
            disabled={isLightTheme}>
            <LightModeIcon />
          </StyledToggleButton>
          <StyledToggleButton
            value={Theme.Dark}
            onClick={handleDarkModeIconClick}
            disabled={!isLightTheme}
            data-testid="darkModeButton">
            <DarkModeIcon />
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    );
  }

  function renderLoggedOutMenuItem() {
    if (!loggedIn) {
      return (
        <StyledMenuItem onClick={handleLoginClick}>
          <Typography sx={{ textAlign: "center" }}>Log In</Typography>
        </StyledMenuItem>
      )
    }
  }

  function renderLoggedInMenuItems() {
    if (loggedIn) {
      return (
        <div>
          <StyledMenuItem onClick={handleLogout}>
            <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
          </StyledMenuItem>
        </div>
      )
    }
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
        onClose={() => handleCloseMenu()}>

        {renderLoggedOutMenuItem()}
        {renderLoggedInMenuItems()}

        <Divider style={{ margin: "10px" }} />

        {renderTemperatureScaleToggle()}
        {renderThemeToggle()}

      </StyledMenu>
      <LoginForm
        open={openLogin}
        onClose={handleCloseLoginForm}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
