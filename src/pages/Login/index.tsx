import { loginAction } from "actions/user";
import Logo from "assets/img/logo.svg";
import Button from "components/Button";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import SimpleButton from "components/SimpleButton";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./style.scss";

const Login = () => {
	const location = useLocation();
	const { from } = (location.state as { from: { pathname: string } }) || {
		from: { pathname: "/" },
	};

	console.log(from);

	const setIsLoggedIn = useStore(state => state.setIsLoggedIn);

	const [loading, error, action] = useActionZ(state => state.user, loginAction);

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		action(credentials.email.trim(), credentials.password).then(() => {
			setIsLoggedIn();
			navigate(from);
		});
	};

	return (
		<div className="login_container">
			<img src={Logo} alt="spacey logo" />
			<Header kind="h1">Login</Header>
			<form onSubmit={handleSubmit}>
				<TextInput
					type="text"
					placeholder="e-mail"
					value={credentials.email}
					error={error}
					onChange={e => setCredentials({ ...credentials, email: e.target.value })}
				/>
				<TextInput
					type="password"
					placeholder="password"
					value={credentials.password}
					error={error}
					onChange={e =>
						setCredentials({ ...credentials, password: e.target.value })
					}
				/>
				{error && <p className="error">{error}</p>}
				<Button loading={loading} disabled={loading} type="submit">
					Log in
				</Button>
			</form>
			<SimpleButton as={Link} to="/signup">
				Sign up
			</SimpleButton>
		</div>
	);
};

export default Login;
