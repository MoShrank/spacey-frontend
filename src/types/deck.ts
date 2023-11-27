export interface CardI {
	id: string;
	question: string;
	answer: string;
	deckID: string;
}

export interface LearningCardI {
	cardID: string;
	recallProbability: number;
	learningSessionID: string;
}

export interface CardEventI {
	deckID: string;
	cardID: string;
	learningSessionID: string;
	startedAt: Date;
	finishedAt: Date;
	correct: boolean;
}

export interface CreateDeckI {
	name: string;
	description: string;
	color: string;
}

export interface UpdateDeckI extends CreateDeckI {
	id: string;
}

export interface DeckI {
	id: string;
	name: string;
	description: string;
	color: string;
	cards: CardI[];
	learningOrder: LearningCardI[];
	totalLearningCards: number;
	lastLearned: Date;
	averageRecallProbability: number;
	created_at: Date;
}

export interface LearningSessionI {
	id: string;
}
