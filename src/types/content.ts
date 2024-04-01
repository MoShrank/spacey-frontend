export interface ContentI {
	id: string;
	source: string;
	processing_status: ProcessingStatus;
	created_at: string;
	title?: string;
	summary?: string;
	raw_text?: string;
	view_text?: string;
	storage_ref?: string;
	source_type?: string;
}

export type ProcessingStatus = "processing" | "processed" | "failed";

export interface WebEntryI {
	id: string;
	name: string;
	url: string;
	summary: string;
	created_at: Date;
}

export interface WebEntryAnswerI {
	answer: string;
	documents: string[];
}
