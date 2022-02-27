import { DeckI, LearningCardI } from "./deck";

export type State = {
	hand: "left" | "right";
	isLoggedIn: boolean;
	user: {
		id: string;
		name: string;
		email: string;
	};
	decks: Array<DeckI>;
	learning: Record<string, LearningCardI[]>;
	config: {
		colors: Array<string>;
	};
	globalError: boolean;
};

export type actionType = (
	// eslint-disable-next-line
	...args: any[]
) => Promise<(state: State) => State>;
