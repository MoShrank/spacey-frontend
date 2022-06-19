import { DeckI, LearningSessionI } from "types/deck";
import { NoteI } from "types/note";
import { UserI } from "types/user";
import { getHasSeenCookie, getLoggedInState } from "util/user";
import create from "zustand";
import { persist } from "zustand/middleware";

interface StateData {
	isLoggedIn: boolean;
	hasSeenCookie: boolean;
	user: UserI;
	decks: DeckI[];
	notes: Record<string, NoteI>;
	config: {
		colors: string[];
	};
	globalError: boolean;

	// local state
	deck: DeckI | undefined;
	learningSession: LearningSessionI | undefined;
}

export interface ZustandStateI extends StateData {
	dispatch: (args: unknown) => void;
	setIsLoggedIn: () => void;
	setHasSeenCookie: () => void;
	setUser: (user: UserI) => void;
	setNotes: (notes: Record<string, NoteI>) => void;
}

export const initialState: StateData = {
	isLoggedIn: getLoggedInState(),
	hasSeenCookie: getHasSeenCookie(),
	user: {
		email: "",
	},
	notes: {},
	decks: [],
	config: {
		colors: [],
	},
	globalError: false,
	deck: undefined,
	learningSession: undefined,
};

export const useStore = create<ZustandStateI>()(
	persist(
		set => ({
			setIsLoggedIn: () =>
				set(state => ({ ...state, isLoggedIn: getLoggedInState() })),
			setHasSeenCookie: () =>
				set(state => ({ ...state, hasSeenCookie: getHasSeenCookie() })),
			setNotes: notes => set(state => ({ ...state, notes: notes })),
			dispatch: args => set(args as ZustandStateI),
			setUser: user => set(state => ({ ...state, user })),
			...initialState,
		}),
		{ name: "spacey", getStorage: () => localStorage },
	),
);

export default useStore;
