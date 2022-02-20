import { useEffect, useState } from "react";
import { useGlobalState } from "store/store";

import useAction from "./useAction";

const useAPIFetch = <T>(
	stateKey: string,
	// eslint-disable-next-line
	action: (...args: any[]) => Promise<(state: T) => T>,
	// eslint-disable-next-line
	args?: any[],
): [boolean, string, T] => {
	const [, error, call] = useAction(stateKey, action);
	const [loading, setLoading] = useState(true);
	const [data] = useGlobalState<T>(stateKey);

	useEffect(() => {
		const fetch = async () => {
			if (!data || !(data as unknown as Array<T>).length) {
				setLoading(true);
				if (args) await call(...args);
				else await call();
				setLoading(false);
				setLoading(false);
			} else {
				setLoading(false);
			}
		};

		fetch();
	}, []);

	return [loading, error, data];
};

export default useAPIFetch;
