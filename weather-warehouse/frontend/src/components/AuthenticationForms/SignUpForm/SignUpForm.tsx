import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogContent, IconButton, InputAdornment, Typography } from '@mui/material';
import * as React from 'react';
import { SignUpFormProps } from './SignUpForm.type';
import { StyledDialog } from '../../../stlyes/common.style';
import { StyledTextField } from '../../../stlyes/inputField.style';
import { StyledButton } from '../../../stlyes/button.style';
import { useEffect } from 'react';
import { useSignUpQuery } from '../../../hooks/useSignUpQuery';


export function SignUpForm(props: Readonly<SignUpFormProps>) {
	const { open, onClose, onRegisterSuccess } = props;
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [securityQuestion, setSecurityQuestion] = React.useState('');
	const [securityAnswer, setSecurityAnswer] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);
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
