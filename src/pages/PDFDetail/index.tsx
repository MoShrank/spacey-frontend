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
import rehypeMathjax from "rehype-mathjax/browser";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

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

	const mdProps = {
		remarkPlugins: [remarkMath, remarkGfm],
		rehypePlugins: [rehypeMathjax, rehypeRaw],
	};

	return (
		<Layout>
			<PagePadding>
				<Header align="center" kind="h3">
					PDF
				</Header>
				<Spacer spacing={2} />

				<Markdown {...mdProps}>{pdf.extracted_markdown}</Markdown>
				<Spacer spacing={2} />
				<DeleteDialog onDelete={handleDelete}>Delete Article</DeleteDialog>
			</PagePadding>
		</Layout>
	);
};

export default PDFDetail;
