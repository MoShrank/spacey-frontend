import React, { useState } from "react";
import { login } from "api/user";
import "./style.scss";
import TextInput from "components/TextInput/TextInput";
import Button from "components/Button/Button";

import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "store/store";

import Logo from "assets/img/logo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const [, setUser] = useGlobalState("user");
    const [, setIsLoggedIn] = useGlobalState("isLoggedIn");

    const navigate = useNavigate();
    const location = useLocation();

    const handleSignup = () => {
        navigate("/signup");
    };

    const from = (location.state as any)?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("please fill in all fields!");
            return;
        }

        setDisabled(true);
        setError("");

        try {
            const user = await login({ email, password, name: null });
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                navigate(from);
            }
        } catch (_) {
            setError("email or password invalid");
        }

        setDisabled(false);
    };

    return (
        <div className="login_container">
            <img src={Logo} alt="spacey logo" />
            <h1 className="header">Login</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    error={error}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                    type="password"
                    placeholder="password"
                    value={password}
                    error={error}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <Button disabled={disabled} type="submit">
                    Log in
                </Button>
            </form>
            <button className="simple_button" onClick={handleSignup}>
                Sign up
            </button>
        </div>
    );
};

export default Login;
