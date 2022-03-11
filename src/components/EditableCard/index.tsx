import CardContainer from "components/CardContainer";
import Form from "components/Form";
import Text from "components/Text";
import { useEffect } from "react";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

interface EditableCardI {
	children?: React.ReactNode;
	card: {
		question: string;
		answer: string;
	};
	deck: DeckI;
	onQuestionInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onAnswerInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const resize = (target: HTMLTextAreaElement) => {
	target.style.height = "1.8rem";
	target.style.height = target.scrollHeight + "px";
};

const handleResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
	resize(e.target as HTMLTextAreaElement);
};

const EditableCard = ({
	children,
	card,
	deck,
	onQuestionInput,
	onAnswerInput,
	onSubmit,
}: EditableCardI) => {
	useEffect(() => {
		resize(document.getElementById("question") as HTMLTextAreaElement);
		resize(document.getElementById("answer") as HTMLTextAreaElement);
	});

	return (
		<Form onSubmit={onSubmit}>
			<Text color="darkblue">{deck.name}</Text>
			<CardContainer color={deck.color}>
				<textarea
					id="question"
					className={`${style.textarea} ${style.question}`}
					value={card.question}
					onInput={handleResize}
					onChange={onQuestionInput}
					placeholder="question"
				/>
				<textarea
					id="answer"
					className={`${style.textarea} ${style.answer}`}
					value={card.answer}
					onInput={handleResize}
					onChange={onAnswerInput}
					placeholder="answer"
				/>
			</CardContainer>
			{children}
		</Form>
	);
};

export default EditableCard;
