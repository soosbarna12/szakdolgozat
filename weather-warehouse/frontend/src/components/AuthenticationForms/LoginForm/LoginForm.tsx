import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLoginQuery } from '../../../hooks/useLoginQuery';
import { StyledButton } from '../../../stlyes/button.style';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { PasswordRecoveryForm } from '../RecoveryForm/RecoveryForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { LoginFormProps } from './LoginForm.type';


export function LoginForm(props: Readonly<LoginFormProps>) {
  const { open, onClose, onLoginSuccess } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openRecovery, setOpenRecovery] = useState(false);
  const { isSuccess, refetch: refetchLoginQuery } = useLoginQuery(username, password);

  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setShowPassword(false);
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      onLoginSuccess();
      onClose();
      window.location.reload();
    }
  }, [isSuccess])


  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent) {
    event.preventDefault();
  }

  function renderShowPassword() {
    return showPassword ? (
      <VisibilityOff fontSize="inherit" />
    ) : (
      <Visibility fontSize="inherit" />
    );
  }

  function handleLogin() {
    refetchLoginQuery();
  };

  function handleSignUpClick() {
    onClose();
    setOpenSignUp(true);
  };

  function handleRecoveryClick() {
    onClose();
    setOpenRecovery(true);
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth data-testid="loginForm">
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

          <Typography variant="h5" sx={{ textAlign: 'left' }} data-testid="loginSuccessButton">
            Log In
          </Typography>

          <StyledTextField
            name="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <StyledTextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {renderShowPassword()}
                </IconButton>
              </InputAdornment>
            }
          />

          <StyledButton variant="outlined" onClick={handleLogin} data-testid="loginButton">
            Log In
          </StyledButton>

          <Link
            component="button"
            onClick={handleSignUpClick}
            data-testid='signUpButton'
            variant="body2"
            sx={{ textAlign: 'center' }}
          >
            Sign up
          </Link>

          <Link
            component="button"
            onClick={handleRecoveryClick}
            data-testid='recoveryButton'
            variant="body2"
            sx={{ textAlign: 'center' }}
          >
            Forgot Password?
          </Link>

        </DialogContent>
      </StyledDialog>
      <SignUpForm
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      />
      <PasswordRecoveryForm open={openRecovery} onClose={() => setOpenRecovery(false)} />
    </>
  );
}
