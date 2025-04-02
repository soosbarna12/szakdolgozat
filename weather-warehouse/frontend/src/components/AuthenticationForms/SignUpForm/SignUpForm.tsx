import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Typography } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import { SignUpFormProps } from './SignUpForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { useAlert } from '../../../utils/AlertContext';

export function SignUpForm(props: Readonly<SignUpFormProps>) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [securityQuestion, setSecurityQuestion] = React.useState('');
	const [securityAnswer, setSecurityAnswer] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);
	const { open, onClose } = props;
	const { showAlert } = useAlert();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent) => { event.preventDefault(); };

	// handle user registration
	const handleRegister = async () => {
		if (password !== confirmPassword) {
			showAlert("Passwords do not match", "error");
			return;
		}
		try {
			await axios.post('/user/register', {
				username,
				password,
				securityQuestion,
				securityAnswer,
			});
			showAlert("User registered successfully", "success");
			onClose();
		} catch (error: any) {
			console.error(error);
			showAlert(error.response?.data?.error || "Registration failed", "error");
		}
	};

	function renderShowPassword() {
		return showPassword ? (
			<VisibilityOff fontSize="inherit" />
		) : (
			<Visibility fontSize="inherit" />
		);
	}

	// reset fields every time dialog opens
	React.useEffect(() => {
		if (open) {
			setUsername('');
			setPassword('');
			setConfirmPassword('');
			setShowPassword(false);
			setSecurityQuestion('');
			setSecurityAnswer('');
		}
	}, [open]);

	return (
		<StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

				<Typography variant="h5" sx={{ textAlign: 'left' }}>
					Sign Up
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

				<StyledTextField
					name="securityQuestion"
					type="text"
					placeholder="Security Question"
					required
					value={securityQuestion}
					onChange={(e) => setSecurityQuestion(e.target.value)}
				/>

				<StyledTextField
					name="securityAnswer"
					type="text"
					placeholder="Security Answer"
					required
					value={securityAnswer}
					onChange={(e) => setSecurityAnswer(e.target.value)}
				/>

				<StyledButton variant="outlined" onClick={handleRegister}>
					Sign Up
				</StyledButton>

			</DialogContent>
		</StyledDialog>
	);
}
