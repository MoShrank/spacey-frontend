import Button from "components/Button";
import Header from "components/Header";
import Layout from "components/Layout";
import Spacer from "components/Spacer";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";

const GPT3Explanation = () => {
	const navigate = useNavigate();

	return (
		<Layout width="s">
			<Header kind="h2">How does our card generation work?</Header>
			<Spacer spacing={2} />
			<Text>
				We use machine learning to automatically generate flashcards for you. More
				specifically do we use large language models, in our case{" "}
				<a
					style={{ display: "inline-block" }}
					href="https://openai.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					openai&apos;s GPT3 model
				</a>
				, to generate cards. We provide GPT3 your text, some additional context and
				a couple of examples of what these flashcards should look like. GPT3 then
				tries to generate cards extracting the most important parts of your text.
				Since GPT3 is not perfect, it might happen that some of the cards may be
				incorrect, do not make sense, or even contain things unrelated to your text.
			</Text>
			<Spacer spacing={2} />
			<Button onClick={() => navigate("/")}>Go to decks</Button>
		</Layout>
	);
};

export default GPT3Explanation;
