import { addAnnotationAction, deleteContentAction } from "actions/content";
import { downloadFile } from "api/content";
import ContentToolbar from "components/ContentToolbar";
import Error from "components/Error";
import Header from "components/Header";
import ToggleButton from "components/Input/ToggleButton";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Markdown from "components/Markdown";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import Spacer from "components/Spacer";
import { default as useAction, default as useActionZ } from "hooks/useAction";
import useOnClickOutside from "hooks/useClickOutside";
import useStore from "hooks/useStore";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AnnotationI } from "types/content";

import HTMLReader from "./HTMLReader";
import style from "./style.module.scss";

interface IMGModalI {
	src: string | null;
	onClose: () => void;
}

const IMGModal = ({ src, onClose }: IMGModalI) => {
	const ref = useRef(null);

	useOnClickOutside(ref, onClose);

	if (!src) return null;

	return (
		<div className={style.zoomed_img_container}>
			<img ref={ref} className={style.zoomed_img} src={src}></img>
		</div>
	);
};

const ContentDetail = () => {
	const { contentID } = useParams();
	const contents = useStore(state => state.content);
	const content = contents.find(content => content.id === contentID);
	const [showSummary, setShowSummary] = useState(true);
	const [showFocus, setShowFocus] = useState(false);
	const [zoomPictureSrc, setZoomPictureSrc] = useState<null | string>(null);
	const [file, setFile] = useState<string | null>(null);
	const [fileLoading, setFileLoading] = useState(false);

	const [, , addAnnotation] = useAction(
		state => state.content,
		addAnnotationAction,
	);

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

	const onClickImg = (imgSource: string) => {
		setZoomPictureSrc(imgSource);
	};

	const onAddAnnotation = (annotation: AnnotationI) => {
		addAnnotation(content.id, content.annotations, annotation);
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
		ContentComp = (
			<HTMLReader
				onClickIMG={onClickImg}
				annotations={content.annotations}
				onAddAnnotation={onAddAnnotation}
			>
				{content.view_text}
			</HTMLReader>
		);
	}

	if (showFocus) {
		return (
			<Modal>
				<ModalLayout onClose={() => setShowFocus(false)}>
					<Header align="center" kind="h3">
						{content.title}
					</Header>
					<Spacer spacing={1} />
					{ContentComp}
				</ModalLayout>

				{zoomPictureSrc && (
					<Modal nodeID="second-modal">
						<IMGModal src={zoomPictureSrc} onClose={() => setZoomPictureSrc(null)} />
					</Modal>
				)}
			</Modal>
		);
	}

	return (
		<Layout width="normal">
			<Spacer spacing={2} />
			<ContentToolbar
				onGenerateCards={onGenerateCards}
				handleDelete={handleDelete}
				handleOpenFocusModus={() => setShowFocus(true)}
				processingStatus={content.processing_status}
			/>
			<Spacer spacing={2} />
			<ToggleButton
				defaultActive={showSummary ? 0 : 1}
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
