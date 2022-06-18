import { sendVerificationEmail } from "api/user";
import Button from "components/Button";
import Header from "components/Header";
import Layout from "components/Layout";
import Spacer from "components/Spacer";
import Text from "components/Text";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import { UserI } from "types/user";

import style from "./style.module.scss";

const VerifyEmail = () => {
	const [user] = useGlobalState<UserI>("user");
	const [disableButton, setDisableButton] = useState(false);

	if (user.emailValidated) return <Navigate to="/" />;

	const sendEmail = () => {
		sendVerificationEmail();
		setDisableButton(true);
	};

	return (
		<Layout>
			<div className={style.content}>
				<Header kind="h2">Thanks for signing up for Spacey</Header>
				<Spacer spacing={4} />
				<Text>
					We just sent you an e-mail. To start your learning journey please use the
					link in the e-mail to validate your account. Make sure to also check your
					spam folder.
				</Text>
				<Spacer spacing={2} />
				<Text>
					Sent to <span className={style.email}>{user.email}</span>
				</Text>
			</div>

			<Button disabled={disableButton} onClick={sendEmail}>
				Resend Email
			</Button>
		</Layout>
	);
};

export default VerifyEmail;
