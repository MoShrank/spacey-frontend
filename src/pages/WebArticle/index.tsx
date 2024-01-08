import { deleteWebContentAction } from "actions/webContent";
import { getAnswerFromArticle } from "api/webContent";
import Button from "components/Button";
import DeleteDialog from "components/DeleteDialog";
import Header from "components/Header";
import TextInput from "components/Input/TextInput";
import Layout from "components/Layout";
import Loader from "components/Loader";
import PagePadding from "components/PagePadding";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import colors from "styles/colors";

interface QAI {
	articleID: string;
}

interface MessageI {
	string: string;
}
interface QAChatI {
	question: MessageI;
	answer: MessageI;
}

interface QAConverstationI {
	chat: QAChatI[];
}

interface ConversationI {
	conversation: QAConverstationI;
	loading: boolean;
}

const Conversation = ({ conversation, loading }: ConversationI) => {
	return (
		<>
			{conversation.chat.map((chat, index) => (
				<div key={index}>
					<Text
						style={{
							lineHeight: 1.1,
							paddingRight: "16px",
							backgroundColor: colors.lightblue,
							paddingLeft: "8px",
							paddingBottom: "8px",
							paddingTop: "8px",
						}}
					>
						{chat.question.string}
					</Text>
					<Text
						style={{
							lineHeight: 1.1,
							paddingLeft: "16px",
							paddingRight: "8px",
							paddingBottom: "8px",
							paddingTop: "8px",
						}}
					>
						{chat.answer.string}
					</Text>
				</div>
			))}
			{loading && <Loader />}
		</>
	);
};

const QA = ({ articleID }: QAI): JSX.Element => {
	const [conversation, setConversation] = useState<QAConverstationI>({
		chat: [],
	});
	const [question, setQuestion] = useState<string>("");
	const [answer, setAnswer] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleQuestion = async () => {
		if (!question || loading) {
			return;
		}

		setError("");
		setQuestion("");
		setAnswer("");

		const newConversationSegment = {
			question: {
				string: question,
			},
			answer: {
				string: "",
			},
		};

		setConversation((prevConversation: QAConverstationI) => ({
			chat: [...prevConversation.chat, newConversationSegment],
		}));

		try {
			setLoading(true);
			const result = await getAnswerFromArticle(articleID, question);
			setAnswer(result.answer);
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!answer) {
			return;
		}

		const words = answer.split(" ");

		const intervalTime = Math.max(
			Math.min(100, 100 / words.length),
			25,
		) as number;

		let currentIndex = 0;

		const interval = setInterval(() => {
			if (currentIndex === words.length) {
				clearInterval(interval);
				return;
			}

			setConversation((prevConversation: QAConverstationI) => {
				const newConversation = { ...prevConversation };
				newConversation.chat[newConversation.chat.length - 1].answer.string =
					prevConversation.chat[newConversation.chat.length - 1].answer.string +
					" " +
					words[currentIndex];
				return newConversation;
			});

			currentIndex++;
		}, intervalTime);

		return () => {
			clearInterval(interval);
		};
	}, [answer]);

	return (
		<>
			<TextInput
				type="text"
				error={error}
				placeholder="Ask a question"
				value={question}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setQuestion(e.target.value)
				}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === "Enter") {
						handleQuestion();
					}
				}}
			/>
			<Spacer spacing={2} />
			{conversation && (
				<Conversation loading={loading} conversation={conversation} />
			)}
		</>
	);
};

const WebArticle = () => {
	const { articleID } = useParams();
	const articles = useStore(state => state.webContent);
	const article = articles.find(article => article.id === articleID);

	if (!article) {
		return <Navigate to="/404" />;
	}

	const navigate = useNavigate();

	const [, , deleteWebContent] = useActionZ(
		state => state.webContent,
		deleteWebContentAction,
	);

	const handleDelete = () => {
		deleteWebContent(article.id);
		navigate("/");
	};

	const onGenerateCards = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		navigate("/cards/generate", { state: { text: article.summary } });
	};

	return (
		<Layout width="normal">
			<PagePadding>
				<Header align="center" kind="h3">
					{article.name}
				</Header>
				<Spacer spacing={2} />
				<Button onClick={onGenerateCards}>Generate Cards</Button>
				<Spacer spacing={2} />
				<QA articleID={article.id} />
				<Spacer spacing={2} />
				<a href={article.url} target="_blank" rel="noopener noreferrer">
					source
				</a>
				<Text>{article.summary}</Text>
				<Spacer spacing={2} />
				<DeleteDialog onDelete={handleDelete}>Delete Article</DeleteDialog>
			</PagePadding>
		</Layout>
	);
};

export default WebArticle;
