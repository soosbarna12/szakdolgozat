import { Typography } from "@mui/material";
import React from "react";
import { StyledMenu, StyledMenuItem } from "../../../../stlyes/common.style";
import { ActionsMenuProps } from "./ActionsMenu.type";

export function ActionsMenu(props: Readonly<ActionsMenuProps>) {
  const { anchorElUser, handleCloseMenu, onSaveLocation, onResetLocation } = props;

  function handleSaveClick() {
    onSaveLocation?.();
    handleCloseMenu(null as any);
  };

  function handleResetClick() {
    onResetLocation?.();
    handleCloseMenu(null as any);
  };

  return (
    <StyledMenu
      PaperProps={{ sx: { width: "120px" } }}
      sx={{ mt: "45px", padding: "0", borderRadius: "20px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseMenu}
    >
      <StyledMenuItem key={"save"} onClick={handleSaveClick}>
        <Typography sx={{ textAlign: "center" }}>Save</Typography>
      </StyledMenuItem>
      <StyledMenuItem key={"reset"} onClick={handleResetClick}>
        <Typography sx={{ textAlign: "center" }}>Reset</Typography>
      </StyledMenuItem>
    </StyledMenu>
  );
}
