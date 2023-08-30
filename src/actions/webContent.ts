import {
	createWebEntry,
	deleteWebEntry,
	getWebEntries,
	searchWebEntries,
} from "api/webContent";
import { WebEntryI } from "types/web_entry";

export const createWebContentAction = async (url: string) => {
	const urlConverted = new URL(url);
	url = urlConverted.toString();

	try {
		const newEntry = await createWebEntry({ url });
		return (curState: Array<WebEntryI>) => {
			return { webContent: [...curState, newEntry] };
		};
	} catch (e) {
		throw Error("Error creating entry.");
	}
};

export const getWebContentAction = async () => {
	try {
		const webContent = await getWebEntries();
		return () => {
			return { webContent };
		};
	} catch (e) {
		throw Error("Error fetching web content.");
	}
};

export const deleteWebContentAction = async (id: string) => {
	try {
		await deleteWebEntry(id);
		return (curState: Array<WebEntryI>) => {
			return { webContent: curState.filter(entry => entry.id !== id) };
		};
	} catch (e) {
		throw Error("Error deleting entry.");
	}
};

export const searchWebContentAction = async (query: string) => {
	try {
		const searchResults = await searchWebEntries(query);
		return () => {
			return {
				searchResults: searchResults,
			};
		};
	} catch (e) {
		throw Error("Error searching web content.");
	}
};
