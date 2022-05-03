export interface NoteI {
	id: string;
	cards: {
		question: string;
		answer: string;
	}[];
}
