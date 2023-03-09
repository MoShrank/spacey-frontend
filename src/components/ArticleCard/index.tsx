import Header from "components/Header";

import style from "./style.module.scss";

interface ArticleCardI {
	name: string;
	to: string;
}

const ArticleCard = ({ name, to }: ArticleCardI) => {
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={to}
			className={style.article_container}
		>
			<Header className={style.article_name} kind="h3">
				{name}
			</Header>
		</a>
	);
};

export default ArticleCard;
