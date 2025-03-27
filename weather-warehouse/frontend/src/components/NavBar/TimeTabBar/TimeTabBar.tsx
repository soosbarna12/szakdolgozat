import { Box, Container, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../consts/routes';
import { StyledTimeTabButton } from '../../../stlyes/button.style';

export function TimeTabBar() {
  const location = useLocation();
  const theme = useTheme();

  // Check if the logged-in user is an admin
  const isAdmin = localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('role') === 'admin';

  function renderMenu() {
    return ROUTES.filter((route) => {
      // Exclude the "Admin" route if the user is not an admin
      if (route.id === 'Admin' && !isAdmin) {
        return false;
      }
      return true;
    }).map((route) => {
      const isActive = location.pathname === route.path;
      return (
        <StyledTimeTabButton
          component={Link}
          to={route.path}
          key={route.id}
          sx={{
            boxShadow: 4,
            backgroundColor: isActive
              ? theme.palette.primary.dark
              : theme.palette.background.paper,
            color: isActive ? '#fff' : 'inherit',
          }}
        >
          {route.text}
        </StyledTimeTabButton>
      );
    });
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Toolbar disableGutters>
        <Box>{renderMenu()}</Box>
      </Toolbar>
    </Container>
  );
}
