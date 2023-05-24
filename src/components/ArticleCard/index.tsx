import Header from "components/Header";
import { Link } from "react-router-dom";
import { WebEntryI } from "types/web_entry";

import style from "./style.module.scss";

interface ArticleCardI {
	webEntry: WebEntryI;
}

const ArticleCard = ({ webEntry }: ArticleCardI) => {
	return (
		<Link to={`/article/${webEntry.id}`} className={style.article_container}>
			<Header className={style.article_name} kind="h3">
				{webEntry.name}
			</Header>
		</Link>
	);
};

export default ArticleCard;
