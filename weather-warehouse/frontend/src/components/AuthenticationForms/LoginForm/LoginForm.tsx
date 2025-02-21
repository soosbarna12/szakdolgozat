// language: tsx
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    DialogContent,
    IconButton,
    InputAdornment,
    Link,
    Typography
} from '@mui/material';
import * as React from 'react';
import { LoginFormProps } from './LoginForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { SignUpForm } from '../SignUpForm/SignUpForm';

export function LoginForm(props: Readonly<LoginFormProps>) {
    const { open, onClose } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);
    const isPassword = !showPassword;

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

    const handleSignUpClick = () => {
        onClose(); // close the login dialog
        setOpenSignUp(true); // open the sign-up dialog
    };

    return (
        <>
            <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h5" sx={{ textAlign: 'left' }}>
                        Log In
                    </Typography>
                    <StyledTextField name="username" type="username" placeholder="Username" required />
                    <StyledTextField
                        type={isPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        required
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
                    <StyledButton variant="outlined" onClick={onClose}>
                        Log In
                    </StyledButton>
                    <Link component="button" onClick={handleSignUpClick} variant="body2" sx={{ textAlign: 'center' }}>
                        Sign up
                    </Link>
                </DialogContent>
            </StyledDialog>
            <SignUpForm open={openSignUp} onClose={() => setOpenSignUp(false)} />
        </>
    );
}