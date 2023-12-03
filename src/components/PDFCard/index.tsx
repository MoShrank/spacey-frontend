import Error from "components/Error";
import Header from "components/Header";
import Loader from "components/Loader";
import { Link } from "react-router-dom";
import { PDFI } from "types/pdf";

import style from "./style.module.scss";

interface PDFCardI {
	pdf: PDFI;
}

const PDFCard = ({ pdf }: PDFCardI) => {
	const title =
		pdf.title ||
		(pdf.extracted_markdown && pdf.extracted_markdown.substring(0, 30) + "...") ||
		"";

	const isProcessing = pdf.processing_status === "processing";
	const hasFailed = pdf.processing_status === "failed";

	return (
		<Link to={`/pdf/${pdf.id}`} className={style.article_container}>
			<Header className={style.article_name} kind="h3">
				{title}
			</Header>
			{isProcessing && <Loader />}
			{hasFailed && <Error>Failed</Error>}
		</Link>
	);
};

export default PDFCard;
