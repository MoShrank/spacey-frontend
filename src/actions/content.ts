import { createContent, deleteContent, getContent } from "api/content";
import { ContentI } from "types/content";

export const createContentAction = async (source: string | File | null) => {
	if (!source) {
		throw Error("No source provided.");
	}

	try {
		let data;

		if (source instanceof File) {
			data = new FormData();
			data.append("file", source);
		} else data = { source };

		const newEntry = await createContent(data);
		return (curState: Array<ContentI>) => {
			return { content: [...curState, newEntry] };
		};
	} catch (e) {
		throw Error("Error creating entry.");
	}
};

export const getContentAction = async () => {
	try {
		const content = await getContent();
		return () => {
			return { content };
		};
	} catch (e) {
		throw Error("Error fetching content.");
	}
};

export const deleteContentAction = async (id: string) => {
	try {
		await deleteContent(id);
		return (curState: Array<ContentI>) => {
			return { content: curState.filter(entry => entry.id !== id) };
		};
	} catch (e) {
		throw Error("Error deleting content.");
	}
};
