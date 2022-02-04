export interface CardI {
	id: string;
	question: string;
	answer: string;
}

export interface DeckI {
	id: string;
	name: string;
	description: string;
	color: string;
	cards: CardI[];
	lastLearned: number;
}
