import API from "api/api";
import { WebEntryAnswerI, WebEntryI } from "types/web_entry";

interface CreateWebEntryI {
	name: string;
	url: string;
	summarise: boolean;
}

export const createWebEntry = async (
	webEntry: CreateWebEntryI,
): Promise<WebEntryI> => {
	return (await API.POST("post", webEntry)) as WebEntryI;
};

export const getWebEntries = async (): Promise<WebEntryI[]> => {
	return (await API.GET("post")) as WebEntryI[];
};

export const deleteWebEntry = async (id: string): Promise<void> => {
	await API.DELETE(`post/${id}`);
};

export const getAnswerFromArticle = async (
	id: string,
	question: string,
): Promise<WebEntryAnswerI> => {
	return (await API.GET(`post/${id}/answer`, { question })) as WebEntryAnswerI;
};

export const searchWebEntries = async (query: string): Promise<WebEntryI[]> => {
	return (await API.GET("post/search", { query })) as WebEntryI[];
};
