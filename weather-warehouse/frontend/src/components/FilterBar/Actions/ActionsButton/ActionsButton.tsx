import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Tooltip } from "@mui/material";
import React from "react";
import { StyledMenuButton } from '../../../../stlyes/button.style';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';

export function ActionsButton() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };
  const handleCloseMenu = () => { setAnchorElUser(null); };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open actions">
        <StyledMenuButton
          onClick={handleOpenUserMenu}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ boxShadow: 4 }}
        >Actions
        </StyledMenuButton>
      </Tooltip>
      <ActionsMenu
        handleCloseMenu={handleCloseMenu}
        anchorElUser={anchorElUser} />
    </Box>
  );
}
