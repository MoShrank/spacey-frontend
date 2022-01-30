import API from "./api";

interface ConfigI {
	colors: Array<string>;
}

export const getConfig = async (): Promise<ConfigI> => {
	const data = (await API.GET("config/frontend")) as ConfigI;
	return data;
};
