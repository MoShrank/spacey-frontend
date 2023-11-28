import { createWebContentAction } from "actions/webContent";
import Button from "components/Button";
import Form from "components/Form";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useActionZ from "hooks/useAction";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./style.module.scss";
import { useUploadFile } from "./useFIleUpload";

const EditableWebContent = () => {
	const navigate = useNavigate();

	const [
		fileLoading,
		fileError,
		handleFileChange,
		handleFileSubmit,
		selectedFile,
	] = useUploadFile();

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
		<Form onSubmit={selectedFile ? handleFileSubmit : handleSubmit}>
			<Header kind="h2" color="primary">
				New Content
			</Header>
			<Spacer spacing={3} />
			<TextInput
				disabled={!!selectedFile}
				type="text"
				placeholder="url or doi"
				value={data.url}
				error={error}
				onChange={e => setData({ ...data, url: e.target.value })}
			/>
			<Spacer spacing={3} />
			<Text className={style.text_divider} align="center">
				or
			</Text>
			<Spacer spacing={3} />
			<input type="file" onChange={handleFileChange}></input>
			<Spacer spacing={3} />
			<BottomContainer>
				{(error || fileError) && <p className="error">{error || fileError}</p>}
				<Button loading={loading || fileLoading} disabled={loading || fileLoading}>
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
