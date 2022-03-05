import tos from "assets/templates/tos";

const TOS = () => {
	return <div dangerouslySetInnerHTML={{ __html: tos }} />;
};

export default TOS;
