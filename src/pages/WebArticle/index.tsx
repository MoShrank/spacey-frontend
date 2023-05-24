import Header from "components/Header";
import Layout from "components/Layout";
import PagePadding from "components/PagePadding";
import Text from "components/Text";
import useStore from "hooks/useStore";
import { Navigate, useParams } from "react-router-dom";

const WebArticle = () => {
	const { articleID } = useParams();
	const articles = useStore(state => state.webContent);
	const article = articles.find(article => article.id === articleID);

	if (!article) {
		return <Navigate to="/404" />;
	}

	return (
		<Layout width="normal">
			<PagePadding>
				<Header align="center" kind="h3">
					{article.name}
				</Header>
				<a href={article.url} target="_blank" rel="noopener noreferrer">
					source
				</a>
				<Text>{article.summary}</Text>
			</PagePadding>
		</Layout>
	);
};

export default WebArticle;
