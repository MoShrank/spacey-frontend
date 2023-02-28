import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Form from "components/Form";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./style.scss";

//interface EditableWebContentI {}

const EditableWebContent = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [data, setData] = useState({
		name: "",
		url: "",
		summarise: true,
	});

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Header kind="h2" color="primary">
				New Website
			</Header>
			<Spacer spacing={3} />
			<TextInput
				type="text"
				placeholder="name"
				value={data.name}
				error={error}
				maxLength={30}
				onChange={e => setData({ ...data, name: e.target.value })}
			/>
			<Spacer spacing={3} />
			<TextInput
				type="url"
				placeholder="url"
				value={data.url}
				error={error}
				onChange={e => setData({ ...data, url: e.target.value })}
			/>
			<Spacer spacing={3} />
			<Checkbox
				checked={data.summarise}
				onChange={() => setData({ ...data, summarise: !data.summarise })}>
				Summarise Website
			</Checkbox>
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
