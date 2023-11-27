import { DeckI, LearningSessionI } from "types/deck";
import { NoteI } from "types/note";
import { PDFI, PDFSearchResult } from "types/pdf";
import { UserI } from "types/user";
import { WebEntryI } from "types/web_entry";
import { getHasSeenCookie, getLoggedInState } from "util/user";
import create from "zustand";
import { persist } from "zustand/middleware";

interface StateData {
	isLoggedIn: boolean;
	hasSeenCookie: boolean;
	user: UserI;
	decks: DeckI[];
	webContent: WebEntryI[];
	searchResults: WebEntryI[];
	notes: Record<string, NoteI>;

	pdfs: PDFI[];
	pdfSearchResults: PDFSearchResult[];

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
	resetSearchResults: () => void;
	resetPDFSearchResults: () => void;
}

export const initialState: StateData = {
	isLoggedIn: getLoggedInState(),
	hasSeenCookie: getHasSeenCookie(),
	user: {
		email: "",
	},
	notes: {},
	decks: [],
	webContent: [],
	searchResults: [],
	pdfs: [],
	pdfSearchResults: [],
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
			resetSearchResults: () => set(state => ({ ...state, searchResults: [] })),
			resetPDFSearchResults: () =>
				set(state => ({ ...state, pdfSearchResults: [] })),
			...initialState,
		}),
		{
			name: "spacey",
			version: 1,
			getStorage: () => localStorage,
			partialize: state =>
				Object.fromEntries(
					Object.entries(state).filter(
						([key]) => !["isLoggedIn", "globalError", "searchResults"].includes(key),
					),
				),
		},
	),
);

export default useStore;
