import { useRef, useState } from "react";

export const useUploadFile = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleDeselect = (e: React.MouseEvent<SVGElement>) => {
		e.preventDefault();
		fileInputRef.current?.value && (fileInputRef.current.value = "");
		setSelectedFile(null);
	};

	return [fileInputRef, handleFileChange, handleDeselect, selectedFile] as const;
};
