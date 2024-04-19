import { ReactComponent as HighlightIcon } from "assets/icons/highlight.svg";
import { ContextMenuItem } from "components/ContextMenu";
import { useLayoutEffect, useRef, useState } from "react";
import {
	GhostHighlight,
	Highlight,
	PdfHighlighter,
	PdfHighlighterUtils,
	PdfLoader,
	PdfSelection,
	usePdfHighlighterContext,
} from "react-pdf-highlighter-extended";

import MyHighlightContainer from "./highlightContainer";
import style from "./style.module.scss";

const getNextId = () => String(Math.random()).slice(2);

interface SelectionTipI {
	addHighlight: (highlight: GhostHighlight) => void;
}

const SelectionTip = ({ addHighlight }: SelectionTipI) => {
	const [compact, setCompact] = useState(true);

	const selectionRef = useRef<PdfSelection | null>(null);

	const {
		getCurrentSelection,
		removeGhostHighlight,
		setTip,
		updateTipPosition,
	} = usePdfHighlighterContext();

	useLayoutEffect(() => {
		updateTipPosition!();
	}, [compact]);

	const handleAddHighlight = () => {
		const selection = getCurrentSelection();
		if (!selection) return;
		selection.makeGhostHighlight();

		addHighlight(selection);
	};

	return (
		<ContextMenuItem
			className={style.context_menu_item}
			onClick={() => handleAddHighlight()}>
			<HighlightIcon />
		</ContextMenuItem>
	);
};

interface PDFViewerI {
	src: string;
	pdfScale?: number;
}

const PDFViewer = ({ src, pdfScale }: PDFViewerI) => {
	const [highlights, setHighlights] = useState<Array<Highlight>>([]);
	const highlighterUtilsRef = useRef<PdfHighlighterUtils>();

	const addHighlight = (highlight: GhostHighlight) => {
		console.log("Saving highlight", highlight);
		setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
	};

	const comp = (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<PdfLoader document={src}>
			{doc => {
				return (
					<PdfHighlighter
						pdfScaleValue={pdfScale}
						utilsRef={_pdfHighlighterUtils => {
							highlighterUtilsRef.current = _pdfHighlighterUtils;
						}}
						highlights={highlights}
						selectionTip={<SelectionTip addHighlight={addHighlight} />}
						pdfDocument={doc}>
						<MyHighlightContainer />
					</PdfHighlighter>
				);
			}}
		</PdfLoader>
	);

	return <div className={style.pdf_container}>{comp}</div>;
};

export default PDFViewer;
