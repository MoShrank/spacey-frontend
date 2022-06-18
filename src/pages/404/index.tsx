import { ReactComponent as CosmosPic } from "assets/img/cosmos.svg";
import Button from "components/Button";
import Header from "components/Header";
import Layout from "components/Layout";
import ScalingSVG from "components/ScalingSVG";
import Spacer from "components/Spacer";
import Text from "components/Text";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

const Error404 = () => {
	return (
		<Layout>
			<div className={style.error_page_container}>
				<ScalingSVG icon={CosmosPic} />
				<div className={style.content_container}>
					<Spacer spacing={4} />
					<Header className={style.center} kind="h2">
						Oops, something is not right
					</Header>
					<Spacer spacing={2} />
					<Text className={style.center} color="darkblue">
						Seems like you went too far out of space.
					</Text>
					<Spacer spacing={2} />
				</div>
				<Link to="/">
					<Button>Return to Home</Button>
				</Link>
			</div>
		</Layout>
	);
};

export default Error404;
