import { getContentAction } from "actions/content";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import useStore from "hooks/useStore";
import { useCallback, useEffect } from "react";
import { ContentI } from "types/content";

const POOL_INTERVAL_MS = 5 * 1000;

const getMessage = (noFailed: number, noProcessed: number) => {
	let message = "";

	if (noProcessed > 0) {
		message += "Finished processing content.";
	}

	if (noFailed > 0) {
		message += "Failed to process content.";
	}

	return message;
};

const usePoolForContent = () => {
	const content = useStore(state => state.content);

	const [, , fetchContentAction] = useAction(
		state => state.content,
		getContentAction,
	);

	const onFetchContent = useCallback(
		(newContent: Array<ContentI>) => {
			const changedStatus = newContent.filter(contentInst => {
				const oldContent = content.find(
					oldContent => oldContent.id === contentInst.id,
				);
				return (
					oldContent &&
					oldContent.processing_status !== contentInst.processing_status
				);
			});

			const finished = changedStatus.filter(
				content => content.processing_status === "processed",
			).length;
			const failed = changedStatus.filter(
				content => content.processing_status === "failed",
			).length;

			if (changedStatus.length > 0) {
				Notificator.push({
					type: "INFO",
					payload: {
						message: getMessage(failed, finished),
					},
				});
			}
		},
		[content],
	);

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		const isProcessing = content.some(
			content => content.processing_status === "processing",
		);

		if (isProcessing) {
			interval = setInterval(() => {
				fetchContentAction().then(onFetchContent);
			}, POOL_INTERVAL_MS);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [content]);
};

export default usePoolForContent;
