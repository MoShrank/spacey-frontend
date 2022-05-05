import ReactDOM from "react-dom";

interface ModalI {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalI) => {
	const node = document.getElementById("modal-root") as HTMLElement;

	return ReactDOM.createPortal(children, node);
};

export default Modal;
