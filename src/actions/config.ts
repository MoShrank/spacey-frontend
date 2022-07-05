import { fetchConfig } from "api/config";

export const getConfig = async () => {
	try {
		const config = await fetchConfig();

		return () => {
			return { config };
		};
	} catch (e) {
		throw e as Error;
	}
};
