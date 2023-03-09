import { createWebEntry, getWebEntries } from "api/webContent";
import { WebEntryI } from "types/web_entry";

export const createWebContentAction = async (
	name: string,
	url: string,
	summarise: boolean,
) => {
	const urlConverted = new URL(url);
	url = urlConverted.toString();

	try {
		const newEntry = await createWebEntry({ url, summarise, name });
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
