import API from "./api";

export interface QueryResultI {
	type: string;
	ids: string[];
}

interface SearchResponseI {
	search_results: QueryResultI[];
	answer: string;
}

export const search = async (query: string): Promise<SearchResponseI> => {
	return (await API.GET("search", { query })) as SearchResponseI;
};
