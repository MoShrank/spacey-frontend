import { deleteWebContentAction } from "actions/webContent";
import DeleteDialog from "components/DeleteDialog";
import Header from "components/Header";
import Layout from "components/Layout";
import PagePadding from "components/PagePadding";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
				<Spacer spacing={2} />
				<DeleteDialog onDelete={handleDelete}>Delete Article</DeleteDialog>
			</PagePadding>
		</Layout>
	);
};

export default WebArticle;
