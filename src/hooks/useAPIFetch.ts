import { useEffect, useState } from "react";
import { useGlobalState } from "store/store";

import useAction from "./useAction";

const useAPIFetch = <T>(
	stateKey: string,
	// eslint-disable-next-line
	action: (...args: any[]) => Promise<(state: T) => T>,
): [boolean, string, T] => {
	const [, error, call] = useAction(stateKey, action);
	const [loading, setLoading] = useState(true);
	const [data] = useGlobalState<T>(stateKey);

	useEffect(() => {
		if (!data || !(data as unknown as Array<T>).length) {
			setLoading(true);
			call()
				.then(() => setLoading(false))
				.catch(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	return [loading, error, data];
};

export default useAPIFetch;
