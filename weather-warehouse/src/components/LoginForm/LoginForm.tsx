import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  DialogContent,
  IconButton,
  InputAdornment,
  Link,
  Typography
} from '@mui/material';
import * as React from 'react';
import { StyledButton } from '../../stlyes/button.style';
import { StyledDialog } from '../../stlyes/common.style';
import { StyledTextField } from '../../stlyes/inputField.style';
import { LoginFormProps } from './LoginForm.type';


export function LoginForm(props: Readonly<LoginFormProps>) {
  const { open, onClose } = props;
  const providers = [{ id: 'credentials', name: 'Email and Password' }];

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Typography variant="h5" sx={{ textAlign: "left" }}>Log In</Typography>
        <StyledTextField name="username" type="username" placeholder="Username" required />
        <StyledTextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder='Password'
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="inherit" />
                ) : (
                  <Visibility fontSize="inherit" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <Link href="/" variant="body2" sx={{ textAlign: 'right' }}>
          Forgot password?
        </Link>
        <StyledButton variant="outlined" onClick={onClose}>
          Log In
        </StyledButton>
        <Link href="/" variant="body2" sx={{ textAlign: 'center' }}>
          Sign up
        </Link>

      </DialogContent>
    </StyledDialog>
  );
}

/*
const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomUsernameField() {
  return (
    <StyledTextField
      id="input-with-icon-textfield"
      name="username"
      type="username"
      size="small"
      placeholder='Username'
      required
      fullWidth
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <StyledTextField
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
      name="password"
      size="small"
      placeholder='Password'
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            size="small"
          >
            {showPassword ? (
              <VisibilityOff fontSize="inherit" />
            ) : (
              <Visibility fontSize="inherit" />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

function CustomButton() {
  return (
    <StyledButton
      type="submit"
      fullWidth
      sx={{ my: 2 }}
    >
      Log In
    </StyledButton>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

export function LoginForm(props: Readonly<LoginFormProps>) {
  const { open, onClose } = props;

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogContent>
        <SignInPage
          sx={{ borderRadius: "50px", height: '100px', backgroundColor: "#ddd", margin: 0, padding: 0, minHeight: 'inherit' }}
          signIn={(provider, formData) =>
            alert(
              `Logging in with "${provider.name}" and credentials: ${formData.get('username')}, ${formData.get('password')}, and checkbox value: ${formData.get('tandc')}`
            )
          }
          slots={{
            title: Title,
            emailField: CustomUsernameField,
            passwordField: CustomPasswordField,
            submitButton: CustomButton,
            signUpLink: SignUpLink,
            forgotPasswordLink: ForgotPasswordLink
          }}
          providers={providers}
        />
      </DialogContent>
    </StyledDialog>
  );
}
*/