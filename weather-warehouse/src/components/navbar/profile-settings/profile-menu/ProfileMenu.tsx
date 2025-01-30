import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface ProfileMenuProps {
    handleCloseUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    anchorElUser: null | HTMLElement;
}

export function ProfileMenu(props: ProfileMenuProps) {
    const { handleCloseUserMenu, anchorElUser } = props;
    
  return (
    <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
    );
  }
