import { useState } from "react";
import { store } from "store/store";

/*
currently only accepts actions as api calls
*/

const useAction = <T>(
	globalStateKey: string,
	// eslint-disable-next-line
	action: (...args: any[]) => Promise<(state: T) => T>,
	loadingDef?: boolean,
): [boolean, string, (...args: unknown[]) => Promise<unknown>] => {
	const [loading, setLoading] = useState(!!loadingDef);
	const [error, setError] = useState("");

	const call = async (...args: unknown[]) => {
		setLoading(true);
		setError("");

		try {
			const update = await action(...args);
			await store.emit<T>(globalStateKey, update);
			setLoading(false);
		} catch (e) {
			setError((e as Error).message);
			setLoading(false);
			throw e as Error;
		}
	};

	return [loading, error, call];
};

export default useAction;
