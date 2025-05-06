import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { HistoricalContext } from "../../../../contexts/HistoricalContext/HistoricalContext";
import { StyledMenu, StyledMenuItem } from "../../../../stlyes/common.style";
import { ActionsMenuProps } from "./ActionsMenu.type";

export function ActionsMenu(props: Readonly<ActionsMenuProps>) {
  const { anchorElUser, handleCloseMenu, onSaveLocation, onExportLocation, onResetLocation } = props;
  const { historicalPageData } = useContext(HistoricalContext);

  function handleSaveClick() {
    onSaveLocation?.();
    handleCloseMenu(null as any);
  };

  function handleExportClick() {
    onExportLocation?.();
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
      <StyledMenuItem data-testid="saveMenuItem" key={"save"} onClick={handleSaveClick} disabled={historicalPageData?.length === 0}>
        <Typography sx={{ textAlign: "center" }}>Save</Typography>
      </StyledMenuItem>
      <StyledMenuItem data-testid="exportMenuItem" key={"export"} onClick={handleExportClick} disabled={historicalPageData?.length === 0}>
        <Typography sx={{ textAlign: "center" }}>Export</Typography>
      </StyledMenuItem>
      <StyledMenuItem data-testid="resetMenuItem" key={"reset"} onClick={handleResetClick} disabled={historicalPageData?.length === 0}>
        <Typography sx={{ textAlign: "center" }}>Reset</Typography>
      </StyledMenuItem>
    </StyledMenu>
  );
}
