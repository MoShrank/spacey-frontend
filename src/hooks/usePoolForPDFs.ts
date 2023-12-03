import { getPDFsAction } from "actions/pdf";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import useStore from "hooks/useStore";
import { useCallback, useEffect } from "react";
import { PDFI } from "types/pdf";

const POOL_INTERVAL = 10000;

const getMessage = (noFailed: number, noProcessed: number) => {
	let message = "";

	if (noProcessed > 0) {
		message += `Successfully transcribed ${noProcessed} PDF${
			noProcessed > 1 ? "s" : ""
		}`;
	}

	if (noFailed > 0) {
		message += `Failed to transcribe ${noFailed} PDF${noFailed > 1 ? "s" : ""}`;
	}

	return message;
};

const usePoolForPDFs = () => {
	const pdfs = useStore(state => state.pdfs);

	const [, , fetchPDFsAction] = useAction(state => state.pdfs, getPDFsAction);

	const onPDFFetch = useCallback(
		(newPDFs: Array<PDFI>) => {
			const changedStatus = newPDFs.filter(pdf => {
				const oldPDF = pdfs.find(oldPDF => oldPDF.id === pdf.id);
				return oldPDF && oldPDF.processing_status !== pdf.processing_status;
			});

			const finished = changedStatus.filter(
				pdf => pdf.processing_status === "processed",
			).length;
			const failed = changedStatus.filter(
				pdf => pdf.processing_status === "failed",
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
		[pdfs],
	);

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		const isProcessing = pdfs.some(pdf => pdf.processing_status === "processing");

		if (isProcessing) {
			interval = setInterval(() => {
				fetchPDFsAction().then(onPDFFetch);
			}, POOL_INTERVAL);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [pdfs]);
};

export default usePoolForPDFs;
