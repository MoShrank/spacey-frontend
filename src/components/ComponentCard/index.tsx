import { ReactComponent as BookIcon } from "assets/icons/book.svg";
import Header from "components/Header";
import Loader from "components/Loader";
import { Link } from "react-router-dom";
import { ContentI } from "types/content";

import style from "./style.module.scss";

interface ContentCardI {
	content: ContentI;
}

const ContentCard = ({ content: content }: ContentCardI) => {
	let innerContent = null;

	if (content.processing_status === "processing") {
		innerContent = <Loader />;
	} else if (content.processing_status === "failed") {
		innerContent = "Failed to process content";
	} else {
		const hasBeenRead = content.read_status;
		innerContent = (
			<>
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
					{!hasBeenRead && <BookIcon className={style.tag} />}
				</Header>
			</>
		);
	}

	return (
		<Link to={`/content/${content.id}`} className={style.content_container}>
			{innerContent}
		</Link>
	);
};

export default ContentCard;
