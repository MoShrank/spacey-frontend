import { createWebContentAction } from "actions/webContent";
import Button from "components/Button";
import Form from "components/Form";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import useActionZ from "hooks/useAction";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";

const EditableWebContent = () => {
	const navigate = useNavigate();

	const [data, setData] = useState({
		url: "",
	});

	const [loading, error, action] = useActionZ(
		state => state.webContent,
		createWebContentAction,
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(data.url).then(() => navigate("/"));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Header kind="h2" color="primary">
				New Website
			</Header>
			<Spacer spacing={3} />
			<TextInput
				type="url"
				placeholder="url"
				value={data.url}
				error={error}
				onChange={e => setData({ ...data, url: e.target.value })}
			/>
			<Spacer spacing={3} />
			<BottomContainer>
				{error && <p className="error">{error}</p>}
				<Button loading={loading} disabled={loading}>
					Add Website
				</Button>
				<SimpleButton as={Link} to={"/"}>
					Cancel
				</SimpleButton>
			</BottomContainer>
		</Form>
	);
};

export default EditableWebContent;
