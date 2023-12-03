import { deletePDFAction } from "actions/pdf";
import DeleteDialog from "components/DeleteDialog";
import Header from "components/Header";
import Layout from "components/Layout";
import PagePadding from "components/PagePadding";
import Spacer from "components/Spacer";
import useAction from "hooks/useAction";
import useStore from "hooks/useStore";
import Markdown from "react-markdown";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const PDFDetail = () => {
	const { pdfID } = useParams();

	const pdfs = useStore(state => state.pdfs);

	if (!pdfID) {
		return <Navigate to="/" />;
	}

	const pdf = pdfs.find(pdf => pdf.id === pdfID);

	if (!pdf) {
		return <Navigate to="/" />;
	}

	const navigate = useNavigate();

	const [, , deletePDF] = useAction(state => state.pdfs, deletePDFAction);

	const handleDelete = () => {
		deletePDF(pdfID).then(() => navigate("/"));
	};

	/*const mdProps = {
		remarkPlugins: [RemarkMathPlugin, remarkGfm],
		rehypePlugins: [rehypeMathjax],
	};
	*/
	return (
		<Layout>
			<PagePadding>
				<Header align="center" kind="h3">
					PDF
				</Header>
				<Spacer spacing={2} />

				<Markdown>{pdf.extracted_markdown}</Markdown>
				<Spacer spacing={2} />
				<DeleteDialog onDelete={handleDelete}>Delete Article</DeleteDialog>
			</PagePadding>
		</Layout>
	);
};

export default PDFDetail;
//<MathJax>{`\\(${content}\\)`}</MathJax>;
