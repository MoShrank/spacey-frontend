export interface CardI {
	id: string;
	question: string;
	answer: string;
	deckID: string;
}

export interface DeckI {
	id: string;
	name: string;
	description: string;
	color: string;
	cards: CardI[];
	lastLearned: Date;
}
