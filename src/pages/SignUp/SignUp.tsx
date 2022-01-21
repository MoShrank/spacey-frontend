import React, { useState } from "react";
import { signup } from "api/user";
import "./style.scss";
import TextInput from "components/TextInput/TextInput";
import Button from "components/Button/Button";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState("");

    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/login");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password || !repPassword || !name) {
            setError("please fill in all fields!");
            return;
        }

        if (password !== repPassword) {
            setError("passwords do not match!");
            return;
        }

        setDisabled(true);
        setError("");
        const ok = await signup({ email, password, name: null });
        setDisabled(false);
        if (!ok) setError("invalid email or password");
        else navigate("/");
    };

    return (
        <div className="signup_container">
            <h1 className="header">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="name"
                    value={name}
                    error={error}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    error={error}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password_container">
                    <TextInput
                        type="password"
                        placeholder="password"
                        value={password}
                        error={error}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextInput
                        type="password"
                        placeholder="confirm password"
                        value={repPassword}
                        error={error}
                        onChange={(e) => setRepPassword(e.target.value)}
                    />
                </div>
                <p className="error">{error}</p>
                <Button disabled={disabled} type="submit">
                    Sign up
                </Button>
            </form>
            <button className="simple_button" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default SignUp;
