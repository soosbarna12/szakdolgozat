import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  DialogContent,
  IconButton,
  InputAdornment,
  Link,
  Typography
} from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import { LoginFormProps } from './LoginForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { useAlert } from '../../../utils/AlertContext';
import { SignUpForm } from '../SignUpForm/SignUpForm';

export function LoginForm(props: Readonly<LoginFormProps & { onLoginSuccess?: () => void }>) {
  const { open, onClose, onLoginSuccess } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { showAlert } = useAlert();

  // reset fields when the dialog opens
  React.useEffect(() => {
    if (open) {
      setUsername('');
      setPassword('');
      setShowPassword(false);
    }
  }, [open]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  function renderShowPassword() {
    return showPassword ? (
      <VisibilityOff fontSize="inherit" />
    ) : (
      <Visibility fontSize="inherit" />
    );
  }

  const handleLogin = async () => {
    try {
      await axios.post('/user/login', {
        username,
        password
      });
      showAlert('Logged in successfully', 'success');
      // Mark as logged in (also store in localStorage)
      localStorage.setItem('loggedIn', 'true');
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      showAlert(error.response?.data?.error || 'Login failed', 'error');
    }
  };

  const handleSignUpClick = () => {
    onClose();
    setOpenSignUp(true);
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
          <Link href="/" variant="body2" sx={{ textAlign: 'right' }}>
            Forgot password
          </Link>
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
        </DialogContent>
      </StyledDialog>
      <SignUpForm open={openSignUp} onClose={() => setOpenSignUp(false)} />
    </>
  );
}