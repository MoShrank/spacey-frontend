import { ReactComponent as CreateIcon } from "assets/icons/create.svg";
import { ReactComponent as GenerateIcon } from "assets/icons/generate.svg";
import {
	ContextMenuContainer,
	ContextMenuItem,
	useContextMenu,
} from "components/ContextMenu";
import Text from "components/Text";
import { useState } from "react";

import style from "./style.module.scss";

type HighlightTypes = "default" | "cardSelected" | "textSelected";

const styleHighlighMapping = {
	default: style.default,
	cardSelected: style.card_selected,
	textSelected: style.text_selected,
};

interface Section {
	start: number;
	end: number;
	type: HighlightTypes;
}

interface HighlightI {
	highlightSections: Section[];
	children: string;
	onGenerateCard: (start: number, end: number) => void;
}

const colorPriority = {
	default: 3,
	cardSelected: 2,
	textSelected: 1,
};

interface SelectionI {
	start: number;
	end: number;
}

const HighlightedText = ({
	children,
	highlightSections,
	onGenerateCard,
}: HighlightI) => {
	const [selection, setSelection] = useState<SelectionI | undefined>(undefined);
	const {
		state: contextMenuState,
		show,
		hide,
		contextMenuRef,
	} = useContextMenu();

	// Sort sections by starting index and color priority
	highlightSections.sort((a, b) => {
		if (a.start === b.start) {
			return colorPriority[a.type] - colorPriority[b.type];
		}
		return a.start - b.start;
	});

	// Merge overlapping sections based on priority
	const mergedSections = highlightSections.reduce(
		(sections: Section[], section) => {
			const lastSection = sections[sections.length - 1];
			if (lastSection && lastSection.end >= section.start) {
				if (colorPriority[lastSection.type] <= colorPriority[section.type]) {
					lastSection.end = Math.max(lastSection.end, section.end);
				}
			} else {
				sections.push(section);
			}
			return sections;
		},
		[],
	);

	// Generate highlighted text
	const highlightedText = [];
	let currentIndex = 0;

	mergedSections.forEach(section => {
		if (currentIndex < section.start) {
			highlightedText.push(
				<span key={currentIndex}>
					{children.slice(currentIndex, section.start)}
				</span>,
			);
		}
		highlightedText.push(
			<span key={section.start} className={styleHighlighMapping[section.type]}>
				{children.slice(section.start, section.end)}
			</span>,
		);
		currentIndex = section.end;
	});

	if (currentIndex < children.length) {
		highlightedText.push(
			<span key={currentIndex}>{children.slice(currentIndex)}</span>,
		);
	}

	const onContextMenu = (e: React.MouseEvent) => {
		const selection = window.getSelection();
		if (selection) {
			e.preventDefault();
			e.stopPropagation();

			const range = selection.getRangeAt(0);
			const start = range.startOffset;
			const end = range.endOffset;

			setSelection({ start, end });

			show(e);
		}
	};

	const handleCloseContextMenu = () => {
		hide();
	};

	const handleGenerateCard = () => {
		if (!selection) return;

		onGenerateCard(selection.start, selection.end);
		handleCloseContextMenu();
	};

	const handleCreateCard = () => {
		// code to create card
		handleCloseContextMenu();
	};

	return (
		<>
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
			<Text onContextMenu={onContextMenu}>{highlightedText}</Text>
		</>
	);
};

export default HighlightedText;
