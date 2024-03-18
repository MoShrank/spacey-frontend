import { deletePDFAction } from "actions/pdf";
import ContentToolbar from "components/ContentToolbar";
import Layout from "components/Layout";
import Markdown from "components/Markdown";
import Spacer from "components/Spacer";
import useAction from "hooks/useAction";
import useStore from "hooks/useStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const PDFDetail = () => {
	const { pdfID } = useParams();

	const pdfs = useStore(state => state.pdfs);
	const navigate = useNavigate();

	const [, , deletePDF] = useAction(state => state.pdfs, deletePDFAction);

	if (!pdfID) {
		return <Navigate to="/" />;
	}

	const pdf = pdfs.find(pdf => pdf.id === pdfID);

	if (!pdf) {
		return <Navigate to="/" />;
	}

	const handleDelete = () => {
		deletePDF(pdfID).then(() => navigate("/"));
	};

	const onGenerateCards = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		navigate("/cards/generate", { state: { text: pdf.extracted_markdown } });
	};

	return (
		<Layout>
			<Spacer spacing={2} />
			<ContentToolbar
				onGenerateCards={onGenerateCards}
				handleDelete={handleDelete}
			/>
			<Spacer spacing={2} />
			<Markdown>{pdf.extracted_markdown}</Markdown>
		</Layout>
	);
};

export default PDFDetail;
