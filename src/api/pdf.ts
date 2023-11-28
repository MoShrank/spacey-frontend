import API from "api/api";
import { PDFI, PDFSearchResult } from "types/pdf";

export const uploadPDF = async (pdf: FormData): Promise<PDFI> => {
	return (await API.POST("pdf", pdf)) as PDFI;
};

export const getPDFs = async (): Promise<PDFI[]> => {
	return (await API.GET("pdf")) as PDFI[];
};

export const searchPDF = async (
	id: string,
	query: string,
): Promise<PDFSearchResult[]> => {
	return (await API.GET(`pdf/${id}/search`, { query })) as PDFSearchResult[];
};
