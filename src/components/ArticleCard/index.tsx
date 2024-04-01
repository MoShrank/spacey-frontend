import Header from "components/Header";
import { Link } from "react-router-dom";
import { ContentI } from "types/content";

import style from "./style.module.scss";

interface ArticleCardI {
	content: ContentI;
}

const ArticleCard = ({ content: content }: ArticleCardI) => {
	return (
		<Link to={`/article/${content.id}`} className={style.article_container}>
			<Header className={style.article_name} kind="h3">
				{content.title}
			</Header>
		</Link>
	);
};

export default ArticleCard;
