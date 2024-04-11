export interface AnnotationI {
	start_path: string;
	start_offset: number;
	end_path: string;
	end_offset: number;
	color: string;
	comment?: string;
	text: string;
}

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
	image?: string;

	annotations: AnnotationI[];
}

export type ProcessingStatus = "processing" | "processed" | "failed";
