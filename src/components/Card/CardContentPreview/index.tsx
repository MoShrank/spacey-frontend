import Text from "components/Text";
import { getPreview } from "util/editor";

import style from "./style.module.scss";

interface CardContentPreviewI {
	content: string;
	color: "darkblue" | "lightgrey" | "grey" | "black" | "white" | "red";
}

const CardContentPreview = ({ content, color }: CardContentPreviewI) => {
	const preview = getPreview(content);

	return (
		<Text color={color} className={style.preview}>
			{preview}
		</Text>
	);
};

export default CardContentPreview;
