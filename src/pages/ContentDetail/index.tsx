import { deleteContentAction } from "actions/content";
import { downloadFile } from "api/content";
import MathJax from "better-react-mathjax/MathJax";
import ContentToolbar from "components/ContentToolbar";
import Error from "components/Error";
import Header from "components/Header";
import ToggleButton from "components/Input/ToggleButton";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Markdown from "components/Markdown";
import Spacer from "components/Spacer";
import Text from "components/Text";
import DOMPurify from "dompurify";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import parse, {
	DOMNode,
	HTMLReactParserOptions,
	domToReact,
} from "html-react-parser";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import style from "./style.module.scss";

const options: HTMLReactParserOptions = {
	replace(domNode: DOMNode) {
		if (domNode.type !== "tag") return;

		if (domNode.name === "p") {
			return (
				<Text style={{ marginTop: "12px", marginBottom: "12px" }}>
					{domToReact(domNode.children as DOMNode[], options)}
				</Text>
			);
		} else if (domNode.name === "img") {
			const newAttributes = {
				...domNode.attribs,
				className: style.img,
			};
			return <img {...newAttributes} />;
		} else if (domNode.name.match(/h[1-3]/)) {
			const headerLevel = domNode.name[1] as "1" | "2" | "3";
			return (
				<Header className={style[`h${headerLevel}`]} kind={`h${headerLevel}`}>
					{domToReact(domNode.children as DOMNode[], options)}
				</Header>
			);
		}
	},
};

const HTMLReader = ({ children = "" }: { children?: string }) => {
	const cleanedText = DOMPurify.sanitize(children);
	const parsedText = parse(cleanedText, options);

	return (
		<MathJax>
			<div className={style.readability_content}>{parsedText}</div>
		</MathJax>
	);
};

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

	const isFile = content.source_type === "pdf" || content.source_type === "doi";

	useEffect(() => {
		const asyncFetchFile = async () => {
			setFileLoading(true);
			const fileBlob = await downloadFile(content.id);

			const fileURL = URL.createObjectURL(fileBlob);
			setFileLoading(false);
			setFile(fileURL);
		};
		if (
			!file &&
			!fileLoading &&
			isFile &&
			content.processing_status === "processed"
		) {
			asyncFetchFile();
		}
	}, [file, fileLoading, content.processing_status]);

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
	else if (isFile) {
		if (!file) {
			ContentComp = <Loader size="large" />;
		} else {
			ContentComp = (
				<iframe
					src={file}
					style={{ width: "100%", height: "100%", border: "none" }}
					title="PDF Viewer"
				></iframe>
			);
		}
	} else {
		ContentComp = <HTMLReader>{content.view_text}</HTMLReader>;
	}

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