import { ZustandStateI, useStore } from "hooks/useStore";
import { useState } from "react";

const useAction = <T>(
	stateSelector: (state: ZustandStateI) => T,
	// eslint-disable-next-line
	fn: (...args: any[]) => Promise<(state: T) => Record<string, T>>,
): [
	boolean,
	string | undefined,
	(...args: unknown[]) => Promise<T | undefined>,
] => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<undefined | string>(undefined);
	const state = useStore();
	const dispatch = state.dispatch;

	const action = async (...args: unknown[]) => {
		setLoading(true);

		try {
			const res = await fn(...args);
			const data = res(stateSelector(state));

			dispatch(data);

			return stateSelector(data as unknown as ZustandStateI);
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return [loading, error, action];
};

export default useAction;
