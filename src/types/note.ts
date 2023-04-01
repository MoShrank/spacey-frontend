export interface GeneratedCard {
	question: string;
	answer: string;
	source_start_index: number;
	source_end_index: number;
}

export interface NoteI {
	id: string;
	text: string;
	cards: GeneratedCard[];
}
