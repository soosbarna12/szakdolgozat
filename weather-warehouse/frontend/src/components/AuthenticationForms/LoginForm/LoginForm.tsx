import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import * as React from 'react';
import { LoginFormProps } from './LoginForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { PasswordRecoveryForm } from '../RecoveryForm/RecoveryForm';
import { useEffect, useState } from 'react';
import { useLoginQuery } from '../../../hooks/useLoginQuery';


export function LoginForm(props: Readonly<LoginFormProps>) {
  const { open, onClose, onLoginSuccess } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openRecovery, setOpenRecovery] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isSuccess, refetch: refetchLoginQuery } = useLoginQuery(username, password);


  useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setShowPassword(false);
    }
  }, [open]);

  // useffectbe kell rakni, mert ha a login sikeres, akkor a useLoginQuery hookban a isSuccess true lesz, viszont a refretch meghívása után nem fog egyből az isSuccess frissülni
  useEffect(() => {
    if (isSuccess) {
      onLoginSuccess();
      window.location.reload(); // refresh the page
      onClose();
    }
  }, [isSuccess])


  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  function handleMouseDownPassword(event: React.MouseEvent) {
    event.preventDefault();
  };

  function renderShowPassword() {
    return showPassword ? (
      <VisibilityOff fontSize="inherit" />
    ) : (
      <Visibility fontSize="inherit" />
    );
  }

  function handleLogin() {
    refetchLoginQuery(); // neccessary to use this query when clicking the login button
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
      <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

            <Typography variant="h5" sx={{ textAlign: 'left' }}>
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

            <StyledButton variant="outlined" onClick={handleLogin}>
              Log In
            </StyledButton>

            <Link
              component="button"
              onClick={handleSignUpClick}
              variant="body2"
              sx={{ textAlign: 'center' }}
            >
              Sign up
            </Link>

            <Link
              component="button"
              onClick={handleRecoveryClick}
              variant="body2"
              sx={{ textAlign: 'center' }}
            >
              Forgot Password?
            </Link>

          </DialogContent>
        </form>
      </StyledDialog>
      <SignUpForm open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <PasswordRecoveryForm open={openRecovery} onClose={() => setOpenRecovery(false)} />
    </>
  );
}