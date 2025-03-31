import { Box, Container, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ROUTES } from '../../../consts/routes';
import { StyledTimeTabButton } from '../../../stlyes/button.style';

interface JwtPayload {
  role: string;
}

function getIsAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

export function TimeTabBar() {
  const location = useLocation();
  const theme = useTheme();
  const isAdmin = getIsAdmin();

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
