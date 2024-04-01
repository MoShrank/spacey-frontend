import { deleteContentAction } from "actions/content";
import { downloadFile } from "api/content";
import ContentToolbar from "components/ContentToolbar";
import Error from "components/Error";
import Header from "components/Header";
import ToggleButton from "components/Input/ToggleButton";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Markdown from "components/Markdown";
import Spacer from "components/Spacer";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ContentDetail = () => {
	const { contentID } = useParams();
	const contents = useStore(state => state.content);
	const content = contents.find(content => content.id === contentID);
	const [showSummary, setShowSummary] = useState(true);

	const [file, setFile] = useState<string | null>(null);
	const [fileLoading, setFileLoading] = useState(false);

	if (!content) {
		return <Navigate to="/404" />;
	}

	useEffect(() => {
		const asyncFetchFile = async () => {
			setFileLoading(true);
			const fileBlob = await downloadFile(content.id);

			const fileURL = URL.createObjectURL(fileBlob);
			setFileLoading(false);
			setFile(fileURL);
		};
		if (!file && !fileLoading && content?.source_type === "pdf") {
			asyncFetchFile();
		}
	}, []);

	const navigate = useNavigate();

	const [, , deleteWebContent] = useActionZ(
		state => state.content,
		deleteContentAction,
	);

	const handleDelete = () => {
		deleteWebContent(content.id);
		navigate("/");
	};

	const onGenerateCards = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		navigate("/cards/generate", { state: { text: content.summary } });
	};

	const onClickShowSource = (name: string) => {
		setShowSummary(name == "summary");
	};

	let ContentComp = null;

	if (showSummary) ContentComp = <Markdown>{content.summary}</Markdown>;
	else if (content.source_type === "pdf" && file)
		ContentComp = (
			<iframe
				src={file}
				style={{ width: "100%", height: "100%", border: "none" }}
				title="PDF Viewer"
			></iframe>
		);
	else
		ContentComp = (
			<div dangerouslySetInnerHTML={{ __html: content.view_text || "" }}></div>
		);

	return (
		<Layout width="normal">
			<Spacer spacing={2} />
			<ContentToolbar
				onGenerateCards={onGenerateCards}
				handleDelete={handleDelete}
				processingStatus={content.processing_status}
			/>
			<Spacer spacing={2} />
			<ToggleButton
				buttonNames={["summary", "source"]}
				onClick={onClickShowSource}
			/>

			{content.processing_status == "processing" ? (
				<Loader size="large" />
			) : content.processing_status === "failed" ? (
				<Error>Failed to process content. Please try again</Error>
			) : (
				<>
					<Spacer spacing={2} />
					<Header align="center" kind="h3">
						<a href={content.source} target="_blank" rel="noopener noreferrer">
							{content.title}
						</a>
					</Header>
					<Spacer spacing={2} />
					{ContentComp}
				</>
			)}
		</Layout>
	);
};

export default ContentDetail;
