// language: tsx
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    DialogContent,
    IconButton,
    InputAdornment,
    Typography
} from '@mui/material';
import * as React from 'react';
import { SignUpFormProps } from './SignUpForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';

export function SignUpForm(props: Readonly<SignUpFormProps>) {
    const { open, onClose } = props;
    const [showPassword, setShowPassword] = React.useState(false);
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

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                    Sign Up
                </Typography>
                <StyledTextField name="username" type="text" placeholder="Username" required />
                <StyledTextField
                    name="password"
                    type={isPassword ? 'text' : 'password'}
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
                <StyledTextField
                    name="confirmPassword"
                    type={isPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    required
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {renderShowPassword()}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <StyledButton variant="outlined" onClick={onClose}>
                    Sign Up
                </StyledButton>
            </DialogContent>
        </StyledDialog>
    );
}
