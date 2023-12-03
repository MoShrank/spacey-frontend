import { uploadPDFAction } from "actions/pdf";
import useAction from "hooks/useAction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUploadFile = () => {
	const navigate = useNavigate();

	const [loading, error, action] = useAction(
		state => state.pdfs,
		uploadPDFAction,
	);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(selectedFile).then(() => navigate("/"));
	};

	return [loading, error, handleFileChange, handleUpload, selectedFile] as const;
};
