import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box, Tooltip } from "@mui/material";
import React from "react";
import { StyledIconButton } from '../../../../stlyes/button.style';
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { ProfileButtonProps } from "./ProfileButton.type";


export function ProfileButton(props: Readonly<ProfileButtonProps>) {
  const { isLightTheme, handleSetLightTheme } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorElUser(null);
  }

  return (
    <Box sx={{ flexGrow: 0 }} data-testid="profileButtonContainer">
      <Tooltip title="Open settings">
        <StyledIconButton
          onClick={handleOpenMenu}
          sx={{ boxShadow: 4 }}
          data-testid="profileButton">
          <PersonOutlineOutlinedIcon sx={{ padding: 0, margin: 0, width: "32px", height: "32px" }} />
        </StyledIconButton>
      </Tooltip>
      <ProfileMenu
        isLightTheme={isLightTheme}
        handleSetLightTheme={handleSetLightTheme}
        handleCloseMenu={handleCloseMenu}
        anchorElUser={anchorElUser}
        data-testid="profileMenu"/>
    </Box>
  );
}
