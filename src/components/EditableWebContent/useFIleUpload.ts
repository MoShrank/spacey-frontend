import { uploadPDFAction } from "actions/pdf";
import useAction from "hooks/useAction";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUploadFile = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const handleDeselect = (e: React.MouseEvent<SVGElement>) => {
		e.preventDefault();
		fileInputRef.current?.value && (fileInputRef.current.value = "");
		setSelectedFile(null);
	};

	return [
		fileInputRef,
		loading,
		error,
		handleFileChange,
		handleUpload,
		handleDeselect,
		selectedFile,
	] as const;
};
