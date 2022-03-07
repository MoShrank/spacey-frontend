import tos from "assets/templates/tos";

const TOS = () => {
	return (
		<div className="template_text" dangerouslySetInnerHTML={{ __html: tos }} />
	);
};

export default TOS;
