import Header from "components/Header";
import { Link } from "react-router-dom";
import { ContentI } from "types/content";

import style from "./style.module.scss";

interface ContentCardI {
	content: ContentI;
}

const ContentCard = ({ content: content }: ContentCardI) => {
	return (
		<Link to={`/content/${content.id}`} className={style.content_container}>
			<Header className={style.content_name} kind="h3">
				{content.title}
			</Header>
		</Link>
	);
};

export default ContentCard;
