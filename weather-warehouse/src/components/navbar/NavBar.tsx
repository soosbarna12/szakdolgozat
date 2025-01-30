import React from "react";
import AppBar from '@mui/material/AppBar';
import { LocationButton } from "./location-selector/location-button/LocationButton";
import { TimeTabBar } from "./time-tab-bar/TimeTabBar";
import { ProfileButton } from "./profile-settings/profile-button/ProfileButton";

export function NavBar() {
  return (
    <AppBar>
        <LocationButton />
        <TimeTabBar />
        <ProfileButton />
    </AppBar>
    
  );
}
