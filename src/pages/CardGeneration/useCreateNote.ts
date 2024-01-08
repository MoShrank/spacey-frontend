import { addGeneratedCardsAction, generateCardsAction } from "actions/deck";
import useAction from "hooks/useAction";
import useStore from "hooks/useStore";
import { useState } from "react";
import { GeneratedCard } from "types/note";

interface CreateNoteI {
	id: string;
	text: string;
	cards: GeneratedCard[];
}

const empyNote: CreateNoteI = {
	id: "",
	text: "",
	cards: [],
};

const useCreateNote = (deckID: string | null) => {
	const [error, setError] = useState<string>("");

	const [, generateError, generateCardsCall] = useAction(
		state => state.notes,
		generateCardsAction,
	);
	const [addLoading, addError, addGeneratedCardsCall] = useAction(
		state => ({ decks: state.decks, notes: state.notes }),
		addGeneratedCardsAction,
	);

	const [notes] = useStore(state => [state.notes, state.setNotes]);

	let note = empyNote;

	if (deckID) {
		const exiNote = notes[deckID];
		if (exiNote) note = exiNote;
	}

	const [noteInput, setNoteInput] = useState(note.text || "");

	const handleGenerateCards = async () => {
		setError("");

		if (!deckID) {
			setError("No deck found");
			return;
		}

		try {
			const notes = await generateCardsCall(deckID, noteInput);
			setNoteInput(notes[deckID].text);
		} catch {
			return;
		}
	};

	const handleAddCards = async () => {
		setError("");

		if (!deckID) {
			setError("No deck found");
			return;
		}

		if (!note.id) {
			setError("No note found");
			return;
		}

		try {
			await addGeneratedCardsCall(note.id, deckID);
		} catch {
			return;
		}
	};

	return {
		note,
		noteInput,
		setNoteText: setNoteInput,
		handleGenerateCards,
		handleAddCards,
		addLoading,
		addError,
		error: error || generateError,
	};
};

export default useCreateNote;
