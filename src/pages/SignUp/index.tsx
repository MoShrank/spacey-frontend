import { signup } from "api/user";
import Planet from "assets/img/logo_simple.svg";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import SimpleButton from "components/SimpleButton";
import Text from "components/Text";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import { ValidationError } from "util/error";

import style from "./style.module.scss";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repPassword, setRepPassword] = useState("");
	const [legalAccepted, setLegalAccepted] = useState(false);

	const [nameError, setNameError] = useState<string | undefined>("");
	const [emailError, setEmailError] = useState<string | undefined>("");
	const [passwordError, setPasswordError] = useState<string | undefined>("");
	const [legalError, setLegalError] = useState<string | undefined>("");

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

		if (!legalAccepted) {
			setLegalError("please accept the legal agreement");
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
		setLegalError("");

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
		<div className={style.container}>
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
				{nameError && (
					<Text className={style.error} color="red">
						{nameError}
					</Text>
				)}
				<TextInput
					type="text"
					placeholder="e-mail"
					value={email}
					error={emailError}
					onChange={e => setEmail(e.target.value)}
				/>
				{emailError && (
					<Text color="red" className={style.error}>
						{emailError}
					</Text>
				)}
				<div className={style.password_container}>
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
				{passwordError && (
					<Text className={style.error} color="red">
						{passwordError}
					</Text>
				)}
				<Checkbox
					checked={legalAccepted}
					error={legalError}
					onChange={() => setLegalAccepted(!legalAccepted)}
				>
					<Text
						className={style.legal_text}
						color={legalError ? "red" : legalAccepted ? "darkblue" : "lightgrey"}
					>
						I agree to the&nbsp;
						<Link target="_blank" rel="noopener noreferrer" to="/privacy">
							Privacy Policy
						</Link>
						&nbsp;and&nbsp;
						<Link target="_blank" rel="noopener noreferrer" to="/tos">
							Terms of Use
						</Link>
					</Text>
				</Checkbox>
				<Button loading={disabled} disabled={disabled} type="submit">
					Sign up
				</Button>
			</form>
			<SimpleButton as={Link} to="/login">
				Cancel
			</SimpleButton>
		</div>
	);
};

export default SignUp;
