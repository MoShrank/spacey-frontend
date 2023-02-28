import API from "api/api";
import { WebEntryI } from "types/web_entry";

interface CreateWebEntryI {
	url: string;
	summarise: boolean;
}

export const createWebEntry = async (
	webEntry: CreateWebEntryI,
): Promise<WebEntryI> => {
	return (await API.POST("web-content/post", webEntry)) as WebEntryI;
};

export const getWebEntries = async (): Promise<WebEntryI[]> => {
	return (await API.GET("web-content/post")) as WebEntryI[];
};
