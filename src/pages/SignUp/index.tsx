import { signup } from "api/user";
import Planet from "assets/img/logo_simple.svg";
import Button from "components/Button";
import Header from "components/Header";
import SimpleButton from "components/SimpleButton";
import TextInput from "components/TextInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import { ValidationError } from "util/error";

import "./style.scss";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repPassword, setRepPassword] = useState("");

	const [nameError, setNameError] = useState<string | undefined>("");
	const [emailError, setEmailError] = useState<string | undefined>("");
	const [passwordError, setPasswordError] = useState<string | undefined>("");

	const [disabled, setDisabled] = useState(false);

	const [, setUser] = useGlobalState("user");
	const [, setIsLoggedIn] = useGlobalState("isLoggedIn");

	const navigate = useNavigate();

	const validate = () => {
		let valid = true;
		if (!name) {
			setNameError("please fill in your name");
			valid = false;
		}
		if (!email) {
			setEmailError("please fill in your email");
			valid = false;
		}
		if (password.length < 6) {
			setPasswordError("password must be at least 6 characters");
			valid = false;
		}
		if (!password) {
			setPasswordError("please fill in your password");
			valid = false;
		}
		if (password !== repPassword) {
			setPasswordError("passwords do not match");
			valid = false;
		}

		return valid;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validate()) return;

		setNameError("");
		setPasswordError("");
		setEmailError("");

		setDisabled(true);
		try {
			const user = await signup({ email: email.trim(), password, name });
			if (user) {
				setIsLoggedIn(true);
				setUser(user);
				navigate("/");
			}
		} catch (error) {
			if (error instanceof ValidationError) {
				setEmailError(error.getFieldError("Email"));
				setPasswordError(error.getFieldError("Password"));
				setNameError(error.getFieldError("Name"));
			} else {
				setEmailError("email already exists");
			}
		}
		setDisabled(false);
	};

	return (
		<div className="signup_container">
			<img src={Planet} alt="planet logo" />
			<Header kind="h1">Sign up</Header>
			<form onSubmit={handleSubmit}>
				<TextInput
					type="text"
					placeholder="name"
					value={name}
					error={nameError}
					onChange={e => setName(e.target.value)}
				/>
				{nameError && <p className="error">{nameError}</p>}
				<TextInput
					type="text"
					placeholder="e-mail"
					value={email}
					error={emailError}
					onChange={e => setEmail(e.target.value)}
				/>
				{emailError && <p className="error">{emailError}</p>}
				<div className="password_container">
					<TextInput
						type="password"
						placeholder="password"
						value={password}
						error={passwordError}
						onChange={e => setPassword(e.target.value)}
					/>
					<TextInput
						type="password"
						placeholder="confirm password"
						value={repPassword}
						error={passwordError}
						onChange={e => setRepPassword(e.target.value)}
					/>
				</div>
				{passwordError && <p className="error">{passwordError}</p>}
				<Button loading={disabled} disabled={disabled} type="submit">
					Sign up
				</Button>
			</form>
			<SimpleButton to="/login">Cancel</SimpleButton>
		</div>
	);
};

export default SignUp;
