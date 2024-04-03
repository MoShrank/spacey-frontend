import ReactDOM from "react-dom";

interface ModalI {
	children: React.ReactNode;
	nodeID?: string;
}

const Modal = ({ children, nodeID = "modal-root" }: ModalI) => {
	let node = document.getElementById(nodeID);

	if (!node) {
		node = document.createElement("div");
		node.setAttribute("id", nodeID);
		document.body.appendChild(node);
	}

	return ReactDOM.createPortal(children, node);
};

export default Modal;
