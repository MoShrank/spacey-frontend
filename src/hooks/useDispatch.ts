import { ZustandStateI, useStore } from "hooks/useStore";
import { useState } from "react";
import { useEffect } from "react";

const useDispatch = <T>(
	stateSelector: (state: ZustandStateI) => T,
	// eslint-disable-next-line
	fn: (...args: any[]) => Promise<(state: T) => Record<string, T>>,
	// eslint-disable-next-line
	...args: any[]
): [boolean, string | undefined, T] => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<undefined | string>(undefined);
	const state = useStore();
	const dispatch = state.dispatch;

	useEffect(() => {
		const controller = new AbortController();

		const action = async () => {
			setLoading(true);

			try {
				const res = await new Promise<(state: T) => Record<string, T>>(
					(resolve, reject) => {
						controller.signal.addEventListener("abort", () => {
							reject("timeout");
						});
						fn(...args)
							.then((res: (state: T) => Record<string, T>) => {
								resolve(res);
							})
							.catch(e => {
								reject(e);
							});
					},
				);

				const data = res(stateSelector(state));
				dispatch(data);
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		};

		action();

		return () => controller.abort();
	}, []);

	return [loading, error, stateSelector(state)];
};

export default useDispatch;
