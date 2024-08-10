import Header from "components/Header";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import Spacer from "components/Spacer";

import ReadProgress from "../ReadProgress";

interface FocusedReaderProps {
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
	onFinishedReading?: () => void;
}

const FocusedReader: React.FC<FocusedReaderProps> = ({
	title,
	children,
	onClose,
	onFinishedReading,
}) => {
	return (
		<Modal>
			<ModalLayout width="reader" onClose={onClose}>
				<ReadProgress
					onFinishedScrolling={onFinishedReading}
					scrollContainerID="content_area"
				/>
				{title && (
					<Header align="center" kind="h3">
						{title}
					</Header>
				)}
				<Spacer spacing={1} />
				{children}
			</ModalLayout>
		</Modal>
	);
};

export default FocusedReader;
