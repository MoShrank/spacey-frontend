import { deletePDFAction } from "actions/pdf";
import DeleteDialog from "components/DeleteDialog";
import Header from "components/Header";
import Layout from "components/Layout";
import PagePadding from "components/PagePadding";
import Spacer from "components/Spacer";
import useAction from "hooks/useAction";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const PDFDetail = () => {
	const { pdfID } = useParams();

	if (!pdfID) {
		return <Navigate to="/" />;
	}

	const navigate = useNavigate();

	const [, , deletePDF] = useAction(state => state.pdfs, deletePDFAction);

	const handleDelete = () => {
		deletePDF(pdfID).then(() => navigate("/"));
	};

	return (
		<Layout>
			<PagePadding>
				<Header align="center" kind="h3">
					PDF
				</Header>
				<Spacer spacing={2} />
				<Spacer spacing={2} />
				<DeleteDialog onDelete={handleDelete}>Delete Article</DeleteDialog>
			</PagePadding>
		</Layout>
	);
};

export default PDFDetail;
