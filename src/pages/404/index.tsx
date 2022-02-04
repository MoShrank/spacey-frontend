import CosmosPic from "assets/img/cosmos.svg";
import Button from "components/Button";
import Header from "components/Header";
import Text from "components/Text";
import { Link } from "react-router-dom";

import "./style.scss";

const Error404 = () => {
	return (
		<div className="error_page_container">
			<img src={CosmosPic} alt="404" />
			<Header kind="h2">Oops, something is not right</Header>
			<Text color="darkblue">Seems like you went too far out of space.</Text>
			<Link to="/">
				<Button>Return to home</Button>
			</Link>
		</div>
	);
};

export default Error404;
