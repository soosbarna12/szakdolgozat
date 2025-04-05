import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Typography } from '@mui/material';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { useAlert } from '../../../utils/AlertContext';
import axios from '../../../utils/axiosConfig';

export function PasswordRecoveryForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => { event.preventDefault(); };


  const handleRecoverPassword = async () => {
    try {
      await axios.post('/user/recoverPassword', {
        username,
        securityAnswer,
        newPassword
      });
      showAlert('Password updated successfully', 'success');
      onClose();
    } catch (error: any) {
      console.error(error);
      showAlert(error.response?.data?.error || 'Password recovery failed', 'error');
    }
  };

  // Reset fields when the dialog opens
  React.useEffect(() => {
    if (open) {
      setUsername('');
      setSecurityAnswer('');
      setNewPassword('');
    }
  }, [open]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={(e) => { e.preventDefault(); handleRecoverPassword(); }}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Recover Password
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
            name="securityAnswer"
            type="text"
            placeholder="Security Answer"
            required
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />

          <StyledTextField
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                </IconButton>
              </InputAdornment>
            }
          />

          <StyledTextField
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                </IconButton>
              </InputAdornment>
            }
          />

          <StyledButton variant="outlined" onClick={handleRecoverPassword}>
            Recover Password
          </StyledButton>
        </DialogContent>
      </form>
    </StyledDialog>
  );
}
