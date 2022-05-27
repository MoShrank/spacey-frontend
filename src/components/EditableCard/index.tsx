import CardContainer from "components/CardContainer";
import Form from "components/Form";
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

const EditableCard = ({
	children,
	card,
	deck,
	onQuestionInput,
	onAnswerInput,
	onSubmit,
}: EditableCardI) => {
	return (
		<>
			<Form onSubmit={onSubmit}>
				<CardContainer color={deck.color}>
					<textarea
						className={`${style.textarea} ${style.question}`}
						value={card.question}
						onChange={onQuestionInput}
						placeholder="question"
					/>
					<textarea
						className={`${style.textarea} ${style.answer}`}
						value={card.answer}
						onChange={onAnswerInput}
						placeholder="answer"
					/>
				</CardContainer>
				{children}
			</Form>
		</>
	);
};

export default EditableCard;
