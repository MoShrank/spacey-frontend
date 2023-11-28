import { uploadPDFAction } from "actions/pdf";
import useActionZ from "hooks/useAction";
import { useState } from "react";

export const useUploadFile = () => {
	const [loading, error, action] = useActionZ(
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
		action(selectedFile);
	};

	return [loading, error, handleFileChange, handleUpload, selectedFile] as const;
};
