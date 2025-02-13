import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, DialogContent, Divider, MenuItem, Typography } from "@mui/material";
import React from "react";
import { StyledButton, StyledDialog, StyledMenu, StyledTextField, StyledToggleButton, StyledToggleButtonGroup } from '../../../../common.style';
import { ProfileMenuProps } from "./ProfileMenu.type";


const ProfileMenuItems = ["Profile", "Logout"];


export function ProfileMenu(props: Readonly<ProfileMenuProps>) {
  const { anchorElUser, isLightTheme, handleCloseMenu, handleSetLightTheme } = props;
  const [openLogin, setOpenLogin] = React.useState(false);


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
          <StyledToggleButton value="celsius" onClick={handleCelsiusScale}>°C</StyledToggleButton>
          <StyledToggleButton value="fahrenheit" onClick={handleFahrenheitScale}>°F</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }

  function renderLanguageToggle() {
    return (
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup onClick={handleCloseMenu}>
          <StyledToggleButton value="english">EN</StyledToggleButton>
          <StyledToggleButton value="hungarian">HU</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
    )
  }


  function renderLoginDialog() {
    return (
      <StyledDialog open={openLogin} onClose={handleCloseLogin} maxWidth="xs" fullWidth>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>Log In</Typography>
          <StyledTextField placeholder="Username" />
          <StyledTextField placeholder="Password" type="password" />
          <StyledButton variant="outlined" onClick={handleCloseLogin}>
            Submit
          </StyledButton>
        </DialogContent>
      </StyledDialog>
    );
  }


  function renderThemeToggle() {
    return (
      <Box sx={{ marginTop: "6px" }}>
        <StyledToggleButtonGroup>
          <StyledToggleButton
            value="light"
            onClick={handleLightModeIconClick}
            disabled={isLightTheme} >
            <LightModeIcon />
          </StyledToggleButton>
          <StyledToggleButton
            value="dark"
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
        anchorOrigin={{ vertical: "top", horizontal: "right", }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right", }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLoginClick}>
          <Typography sx={{ textAlign: "center" }}>Log In</Typography>
        </MenuItem>

        {ProfileMenuItems.map((ProfileMenuItems) => (
          <MenuItem key={ProfileMenuItems} onClick={handleCloseMenu}>
            <Typography sx={{ textAlign: "center" }}>{ProfileMenuItems}</Typography>
          </MenuItem>
        ))}

        <Divider />
        {renderTemperatureScaleToggle()}
        {renderLanguageToggle()}
        {renderThemeToggle()}
      </StyledMenu >

      {renderLoginDialog()}
    </>
  )
}
