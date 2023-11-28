type ProcessingStatus = "processing" | "processed" | "failed";

export interface PDFI {
	id: string;
	extracted_markdown?: string;
	processing_status: ProcessingStatus;
}

export interface PDFSearchResult {
	answer: string;
	start_idx: number;
	end_idx: number;
}
