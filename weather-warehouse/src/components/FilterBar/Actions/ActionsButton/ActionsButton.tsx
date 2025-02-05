import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';

export function ActionsButton() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };
  const handleCloseMenu = () => { setAnchorElUser(null); };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open actions">
        <Button
          onClick={handleOpenUserMenu}
          //variant="outlined"
          //color='primary'
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ boxShadow: 4, margin: 1, borderRadius: 20, width: 150, height: 40, fontWeight: 100 }}
        >Actions
        </Button>
      </Tooltip>
      <ActionsMenu
        handleCloseMenu={handleCloseMenu}
        anchorElUser={anchorElUser} />
    </Box>
  );
}