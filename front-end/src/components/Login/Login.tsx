import "./Login.styles.css";
import {
	Box,
	Button,
	Card,
	Checkbox,
	FormControlLabel,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/logo-color.svg";
import { useState } from "react";
import axios from "axios";
import { useAuthActions } from "../../providers/Auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [open, setOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [formType, setFormType] = useState("login");

	const { setAccessToken } = useAuthActions();

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		setSnackbarMessage("");
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);
	return (
		<div
			className="container"
			style={{
				backgroundImage: "url(auth-bg.png)",
				backgroundSize: "cover",
				backgroundColor: "#0b454f",
			}}
		>
			<Card className="card-container">
				<Box className="logo">
					<img src={logo} alt="logo" />
					<Typography>
						Automate <br />
						Construction <br />
						Monitoring
					</Typography>
				</Box>
				<Box>
					<Typography
						style={{
							textTransform: "uppercase",
							fontSize: "16px",
						}}
					>
						{formType === "login" ? "Login" : "Register"}
					</Typography>
					<Typography
						style={{
							color: "rgb(235, 87, 87)",
							fontSize: "20px",
							fontWeight: "700",
						}}
					>
						Welcome {formType === "login" ? "Back" : ""}
					</Typography>
				</Box>
				<Box>
					<TextField
						fullWidth
						id="email"
						error={emailError}
						label="Email or Username"
						variant="outlined"
						style={{
							marginBottom: "20px",
						}}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						helperText={
							emailError && "Username is a required field"
						}
					/>
					<TextField
						fullWidth
						id="password"
						error={passwordError}
						label="Password"
						variant="outlined"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						helperText={
							passwordError && "Password is a required field"
						}
					/>
					<Box className="show-password">
						<FormControlLabel
							control={
								<Checkbox
									value={showPassword}
									onChange={(e) =>
										setShowPassword(e.target.checked)
									}
								/>
							}
							label="Show password"
						/>

						<Typography
							style={{
								color: "#0b454f",
								fontSize: "14px",
								fontWeight: "700",
							}}
							onClick={() => {
								if (formType === "login") {
									setFormType("register");
								} else {
									setFormType("login");
								}
							}}
						>
							{formType === "login" ? "Register" : "Login"}?
						</Typography>
					</Box>

					<Box className="button-container">
						<Button
							fullWidth
							variant="contained"
							onClick={() => {
								setEmailError(!email);
								setPasswordError(!password);
								const url =
									formType === "login"
										? "/api/auth/login"
										: "/api/auth/register";
								if (email && password) {
									axios
										.post(url, {
											email,
											password,
										})
										.then((res: any) => {
											if (res?.data?.data?.access_token) {
												return setAccessToken(
													res.data.data.access_token
												);
											}

											if (res?.data?.result) {
												if (formType === "register") {
													setSnackbarMessage(
														"Account created successfully"
													);
													setOpen(true);
													setFormType("login");
												}
												return;
											}

											if (
												res?.data?.error &&
												res?.data?.error_message
											) {
												setSnackbarMessage(
													res?.data.error_message
												);
												setOpen(true);
												return;
											}

											if (
												!res?.data?.result &&
												res?.data?.message
											) {
												setSnackbarMessage(
													res?.data.message
												);
												setOpen(true);
												return;
											}

											setSnackbarMessage(
												"Something went wrong"
											);
											setOpen(true);
										})
										.catch((err: any) => {
											console.log(err);
											setSnackbarMessage(
												err.response.data.message
											);
											setOpen(true);
										});
								}
							}}
						>
							{formType === "login" ? "Login" : "Register"}
						</Button>
					</Box>
				</Box>
			</Card>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={snackbarMessage}
				action={action}
			/>
		</div>
	);
}

export default Login;
