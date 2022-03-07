import privacy from "assets/templates/privacy";

const Privacy = () => {
	return (
		<div
			className="template_text"
			dangerouslySetInnerHTML={{ __html: privacy }}
		/>
	);
};

export default Privacy;
