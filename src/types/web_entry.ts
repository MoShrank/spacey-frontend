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
