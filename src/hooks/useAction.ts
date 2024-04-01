import { ZustandStateI, useStore } from "hooks/useStore";
import { useState } from "react";
import { StateSelector } from "zustand";

const useAction = <TParams extends unknown[], TState, TResult>(
	selector: StateSelector<ZustandStateI, TState>,
	action: (...args: TParams) => Promise<(stateSlice: TState) => TResult>,
) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<undefined | string>(undefined);

	const state = useStore();
	const dispatch = state.dispatch;

	const asyncAction = async (...args: TParams) => {
		setLoading(true);
		setError(undefined);

		try {
			const res = await action(...args);
			const data = res(selector(state));

			dispatch(data);
			return selector(data as unknown as ZustandStateI);
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return [loading, error, asyncAction] as const;
};

export default useAction;
