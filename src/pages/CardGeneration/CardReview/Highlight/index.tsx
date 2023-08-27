import { ReactComponent as CreateIcon } from "assets/icons/create.svg";
import { ReactComponent as GenerateIcon } from "assets/icons/generate.svg";
import Text from "components/Text";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";

import style from "./style.module.scss";

interface IVerticalLineProps {
	color?: string;
	thickness?: number;
	style?: React.CSSProperties;
}

const VerticalLine: React.FC<IVerticalLineProps> = ({
	color = "#ccc",
	thickness = 1,
	style,
}) => {
	const defaultStyle: React.CSSProperties = {
		borderLeft: `${thickness}px solid ${color}`,
		alignSelf: "stretch",
	};

	const mergedStyle = { ...defaultStyle, ...style };

	return <div style={mergedStyle}></div>;
};

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

const HighlightedText = ({
	children,
	highlightSections,
	onGenerateCard,
}: HighlightI) => {
	const [selectedText, setSelectedText] = useState("");

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

	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});

	const onContextMenu = (e: React.MouseEvent) => {
		const selection = window.getSelection()?.toString();
		if (selection) {
			e.preventDefault();
			e.stopPropagation();

			setSelectedText(selection);
			setContextMenuPosition({ x: e.clientX, y: e.clientY });
			setIsContextMenuOpen(true);
		}
	};

	const handleCloseContextMenu = () => {
		setIsContextMenuOpen(false);
	};

	const handleGenerateCard = () => {
		// find start and end index of selected text
		if (!selectedText) return;

		const selectedTextLength = selectedText.length;
		const selectedTextStartIndex = children.indexOf(selectedText);
		const selectedTextEndIndex = selectedTextStartIndex + selectedTextLength;

		onGenerateCard(selectedTextStartIndex, selectedTextEndIndex);
		handleCloseContextMenu();
	};

	const handleCreateCard = () => {
		// code to create card
		handleCloseContextMenu();
	};

	const contextMenuRef = useRef(null);

	useOnClickOutside(contextMenuRef, handleCloseContextMenu);

	return (
		<>
			{isContextMenuOpen && (
				<div
					ref={contextMenuRef}
					className={style.context_menu_container}
					style={{
						top: contextMenuPosition.y,
						left: contextMenuPosition.x,
					}}
				>
					<div className={style.context_menu_item}>
						<GenerateIcon onClick={handleGenerateCard} />
					</div>
					<VerticalLine />
					<div className={style.context_menu_item}>
						<CreateIcon onClick={handleCreateCard} />
					</div>
				</div>
			)}
			<Text onContextMenu={onContextMenu}>{highlightedText}</Text>
		</>
	);
};

export default HighlightedText;
