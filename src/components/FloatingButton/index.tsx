import "./style.scss";

interface FloatingButtonI {
	action?: () => void;
	id?: string;
}

const FloatingButton = ({ action, id }: FloatingButtonI) => {
	return (
		<div id={id} className="floating_button_container" onClick={action}>
			<div className="horizontal-plus"></div>
			<div className="vertical-plus"></div>
		</div>
	);
};

export default FloatingButton;
