import { useEffect } from "react";
import { useGlobalState } from "store/store";

import useAction from "./useAction";

const useAPIFetch = <T>(
	stateKey: string,
	// eslint-disable-next-line
	action: (...args: any[]) => Promise<(state: T) => T>,
): [boolean, string, T] => {
	const [loading, error, call] = useAction(stateKey, action, true);
	const [data] = useGlobalState<T>(stateKey);

	useEffect(() => {
		if (!data || !(data as unknown as Array<T>).length) {
			call();
		}
	}, []);

	return [loading, error, data];
};

export default useAPIFetch;
