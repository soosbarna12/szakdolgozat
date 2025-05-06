import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSignUpQuery } from '../../../hooks/useSignUpQuery';
import { StyledButton } from '../../../stlyes/button.style';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { SignUpFormProps } from './SignUpForm.type';


export function SignUpForm(props: Readonly<SignUpFormProps>) {
	const { open, onClose, onRegisterSuccess } = props;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [securityQuestion, setSecurityQuestion] = useState('');
	const [securityAnswer, setSecurityAnswer] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { isSuccess, refetch: refetchRegisterQuery } = useSignUpQuery(username, password, securityQuestion, securityAnswer);

	useEffect(() => {
		if (open) {
			setUsername('');
			setPassword('');
			setConfirmPassword('');
			setSecurityQuestion('');
			setSecurityAnswer('');
			setShowPassword(false);
		}
	}, [open]);

	// useffectbe kell rakni, mert ha a login sikeres, akkor a useLoginQuery hookban a isSuccess true lesz, viszont a refretch meghívása után nem fog egyből az isSuccess frissülni
	useEffect(() => {
		if (isSuccess) {
			onRegisterSuccess();
			//window.location.reload(); // refresh the page
			onClose();
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

	function handleRegister() {
		refetchRegisterQuery(); // neccessary to use this query when clicking the login button
	};


	return (
		<StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth data-testid="signUpDialog">
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

				<Typography variant="h5" sx={{ textAlign: 'left' }} data-testid="signUpTitle">
					Sign Up
				</Typography>

				<StyledTextField
					name="username"
					type="text"
					placeholder="Username"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					data-testid="usernameInput"
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
								data-testid="togglePasswordVisibility"
							>
								{renderShowPassword()}
							</IconButton>
						</InputAdornment>
					}
					data-testid="passwordInput"
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
								data-testid="toggleConfirmPasswordVisibility"
							>
								{renderShowPassword()}
							</IconButton>
						</InputAdornment>
					}
					data-testid="confirmPasswordInput"
				/>

				<StyledTextField
					name="securityQuestion"
					type="text"
					placeholder="Security Question"
					required
					value={securityQuestion}
					onChange={(e) => setSecurityQuestion(e.target.value)}
					data-testid="securityQuestionInput"
				/>

				<StyledTextField
					name="securityAnswer"
					type="text"
					placeholder="Security Answer"
					required
					value={securityAnswer}
					onChange={(e) => setSecurityAnswer(e.target.value)}
					data-testid="securityAnswerInput"
				/>

				<StyledButton
					variant="outlined"
					onClick={handleRegister}
					data-testid="signUpButton"
				>
					Sign Up
				</StyledButton>

			</DialogContent>
		</StyledDialog>
	);
}
