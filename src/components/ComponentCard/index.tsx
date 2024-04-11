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
			{content.image && (
				<div className={style.image_container}>
					<img
						src={`data:image/jpeg;base64,${content.image}`}
						alt="Dynamic from DB"
					/>
				</div>
			)}
			<Header className={style.content_name} kind="h3">
				{content.title}
			</Header>
		</Link>
	);
};

export default ContentCard;
