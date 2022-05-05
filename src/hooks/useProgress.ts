import { useRef } from "react";

const useProgress = (abortController?: AbortController, refreshRate = 10) => {
	const ref = useRef<HTMLElement>(null);

	let width = 100;

	const startProgress = async (seconds: number): Promise<void> => {
		const update = (refreshRate / (seconds * 1000)) * 100;

		return new Promise<void>((resolve, reject) => {
			const updateProgress = () => {
				if (!ref.current) {
					clearInterval(interval);
					return resolve();
				}

				width = width - update;
				ref.current.style.width = width + "%";
				if (width <= 0) {
					clearInterval(interval);
					return resolve();
				}
			};
			const interval = setInterval(updateProgress, refreshRate);
			if (abortController) {
				abortController.signal.addEventListener("abort", () => {
					clearInterval(interval);
					return reject();
				});
			}
		});
	};

	return { ref, startProgress };
};

export default useProgress;
