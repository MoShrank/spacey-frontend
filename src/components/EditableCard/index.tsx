import CardContainer from "components/Card/CardContainer";
import CardEditor from "components/Card/CardEditor";
import Form from "components/Form";
import { DeckI } from "types/deck";

interface EditableCardI {
	children?: React.ReactNode;
	card: {
		question: string;
		answer: string;
		id: string;
	};
	deck: DeckI;
	onQuestionInput: (question: string) => void;
	onAnswerInput: (answer: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	editable?: boolean;
}

const EditableCard = ({
	children,
	card,
	deck,
	onQuestionInput,
	onAnswerInput,
	onSubmit,
	editable = true,
}: EditableCardI) => {
	return (
		<>
			<Form onSubmit={onSubmit}>
				<CardContainer
					style={{ marginTop: editable ? "38px" : 0 }}
					color={deck.color}
				>
					<CardEditor
						key={card.id}
						toolbarColor={deck.color}
						question={card.question}
						setQuestion={onQuestionInput}
						answer={card.answer}
						setAnswer={onAnswerInput}
						readOnly={!editable}
					/>
				</CardContainer>
				{children}
			</Form>
		</>
	);
};

export default EditableCard;
