import API from "./api";

interface ConfigI {
	colors: Array<string>;
}

export const fetchConfig = async (): Promise<ConfigI> => {
	const data = (await API.GET("config/frontend")) as ConfigI;
	return data;
};
