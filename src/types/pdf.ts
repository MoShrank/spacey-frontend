type ProcessingStatus = "processing" | "processed" | "failed";

export interface PDFI {
	id: string;
	title?: string;
	extracted_markdown?: string;
	processing_status: ProcessingStatus;
	created_at: string;
}

export interface PDFSearchResult {
	answer: string;
	start_idx: number;
	end_idx: number;
}
