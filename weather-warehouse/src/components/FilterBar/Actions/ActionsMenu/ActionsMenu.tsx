import { MenuItem, Typography } from "@mui/material";
import React from "react";
import { StyledMenu } from "../../../../common.style";
import { ActionsMenuProps } from "./ActionsMenu.type";

const ActionsMenuItems = ["Edit", "Duplicate", "Archive", "More"];

export function ActionsMenu(props: Readonly<ActionsMenuProps>) {
  const { anchorElUser, handleCloseMenu } = props;

  return (
    <StyledMenu
      sx={{ mt: "45px", padding: "0", borderRadius: "20px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right", }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseMenu}
    >
      {ActionsMenuItems.map((ActionsMenuItems) => (
        <MenuItem key={ActionsMenuItems} onClick={handleCloseMenu}>
          <Typography sx={{ textAlign: "center" }}>{ActionsMenuItems}</Typography>
        </MenuItem>
      ))}
    </StyledMenu >
  );
}