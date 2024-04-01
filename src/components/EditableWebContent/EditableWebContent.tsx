import { createContentAction } from "actions/content";
import { ReactComponent as CloseIcon } from "assets/icons/exit.svg";
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

	const [fileInputRef, handleFileChange, handleDeselect, selectedFile] =
		useUploadFile();

	const [data, setData] = useState({
		url: "",
	});

	const handleCustomFileChangeButton = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		fileInputRef.current?.click();
	};

	const [loading, error, action] = useActionZ(
		state => state.content,
		createContentAction,
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(data.url || selectedFile).then(() => navigate("/"));
	};

	const disableSubmitButton = loading || !(data.url || selectedFile);

	return (
		<Form onSubmit={handleSubmit}>
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
			<div className={style.file_upload_container}>
				<input
					className={style.file_input}
					type="file"
					accept="application/pdf"
					ref={fileInputRef}
					onChange={handleFileChange}
				></input>
				<Button
					className={style.custom_file_upload}
					onClick={handleCustomFileChangeButton}
				>
					{selectedFile?.name || "Choose File"}
				</Button>
				{selectedFile && (
					<CloseIcon className={style.icon} onClick={handleDeselect} />
				)}
			</div>
			<Spacer spacing={3} />
			<BottomContainer>
				{error && <p className="error">{error}</p>}
				<Button loading={loading} disabled={disableSubmitButton}>
					Add
				</Button>
				<SimpleButton as={Link} to={"/"}>
					Cancel
				</SimpleButton>
			</BottomContainer>
		</Form>
	);
};

export default EditableWebContent;
