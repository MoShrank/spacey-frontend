import { ReactComponent as CreateIcon } from "assets/icons/create.svg";
import { ReactComponent as GenerateIcon } from "assets/icons/generate.svg";
import {
	ContextMenuContainer,
	ContextMenuItem,
	useContextMenu,
	useHighlight,
} from "components/ContextMenu";
import Text from "components/Text";
import useSelectionChange from "hooks/useSelectionChange";
import { useEffect, useRef, useState } from "react";

import style from "./style.module.scss";

const createRange = (start: number, end: number, node: Node) => {
	const range = new Range();
	range.setStart(node, start);
	range.setEnd(node, end);
	return range;
};

interface SelectionI {
	start: number;
	end: number;
}

interface HighlightI {
	highlightSections: SelectionI[];
	selectedCard: SelectionI | undefined;
	children: string;
	onGenerateCard: (start: number, end: number) => void;
}

const HighlightedText = ({
	children,
	highlightSections,
	onGenerateCard,
	selectedCard,
}: HighlightI) => {
	const [selection, setSelection] = useState<SelectionI | undefined>(undefined);
	const {
		state: contextMenuState,
		show,
		hide,
		contextMenuRef,
		calcContextMenuPosition,
	} = useContextMenu();

	const contextMenuContainerRef = useRef<HTMLDivElement>(null);

	const { root: editorRootRef, highlight, unhighlight } = useHighlight();

	useEffect(() => {
		if (!editorRootRef.current) return;
		unhighlight(undefined, undefined, true);
		for (const section of highlightSections) {
			const { start, end } = section;

			const range = createRange(start, end, editorRootRef.current.childNodes[0]);

			highlight(range);
		}
	}, [editorRootRef.current, highlightSections]);

	useEffect(() => {
		if (!editorRootRef.current) return;

		if (selectedCard) {
			const { start, end } = selectedCard;
			const range = createRange(start, end, editorRootRef.current.childNodes[0]);

			highlight(range, "card-selected-highlight", 5);
		} else {
			unhighlight(undefined, "card-selected-highlight", true);
		}
	}, [editorRootRef.current, selectedCard]);

	const onContextMenu = () => {
		const selection = window.getSelection();
		if (selection && !selection.isCollapsed && contextMenuContainerRef.current) {
			const range = selection.getRangeAt(0);
			const start = range.startOffset;
			const end = range.endOffset;

			setSelection({ start, end });

			const pos = calcContextMenuPosition(
				range,
				contextMenuContainerRef.current,
				2,
			);
			show(pos);
		}
	};

	const handleGenerateCard = () => {
		if (!selection) return;

		onGenerateCard(selection.start, selection.end);
		hide();
	};

	const handleCreateCard = () => {
		// TODO: code to create card
		hide();
	};

	useSelectionChange(() => {
		onContextMenu();
	});

	return (
		<div
			ref={contextMenuContainerRef}
			style={{
				position: "relative",
				display: "flex",
			}}
		>
			<div className={style.text_container}>
				<Text ref={editorRootRef}>{children}</Text>
			</div>
			{contextMenuState.visible && (
				<ContextMenuContainer
					ref={contextMenuRef}
					x={contextMenuState.x}
					y={contextMenuState.y}
				>
					<ContextMenuItem onClick={handleGenerateCard}>
						<GenerateIcon />
					</ContextMenuItem>
					<ContextMenuItem onClick={handleCreateCard}>
						<CreateIcon />
					</ContextMenuItem>
				</ContextMenuContainer>
			)}
		</div>
	);
};

export default HighlightedText;
