import { deletePDF, getPDFs, uploadPDF } from "api/pdf";
import { PDFI } from "types/pdf";

export const uploadPDFAction = async (pdf: File | null) => {
	if (!pdf) {
		throw Error("No file selected.");
	}

	try {
		const body = new FormData();
		body.append("file", pdf);

		const pdfRes = await uploadPDF(body);

		return (curState: Array<PDFI>) => {
			return { pdfs: [...curState, pdfRes] };
		};
	} catch (e) {
		throw Error("Error uploading PDF.");
	}
};

export const getPDFsAction = async () => {
	try {
		const pdfs = await getPDFs();
		return () => {
			return { pdfs };
		};
	} catch (e) {
		throw Error("Error fetching PDFs.");
	}
};

export const searchPDF = async (id: string, query: string) => {
	try {
		const searchResults = await searchPDF(id, query);
		return () => {
			return {
				pdfSearchResults: searchResults,
			};
		};
	} catch (e) {
		throw Error("Error searching PDF.");
	}
};

export const deletePDFAction = async (id: string) => {
	try {
		await deletePDF(id);
		return (curState: Array<PDFI>) => {
			return { pdfs: curState.filter(pdf => pdf.id !== id) };
		};
	} catch (e) {
		throw Error("Error deleting PDF.");
	}
};
