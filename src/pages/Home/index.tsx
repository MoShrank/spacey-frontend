import { ReactComponent as ArrowIcon } from "assets/icons/arrow.svg";
import { ReactComponent as Content } from "assets/icons/article.svg";
import { ReactComponent as CardDeckIcon } from "assets/icons/card_deck.svg";
import ContentCard from "components/ComponentCard";
import ContentTitle from "components/ContentTitle";
import Deck from "components/Deck";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import Hint from "components/Hint";
import Layout from "components/Layout";
import ListContainer from "components/ListContainer";
import PagePadding from "components/PagePadding";
import Popup from "components/Popup";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useOnClickOutside from "hooks/useClickOutside";
import useStore from "hooks/useStore";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface PopupItemI {
	Icon: React.ReactNode;
	title: string;
	url: string;
}

const PopupItem = ({ Icon, title, url }: PopupItemI) => (
	<Link to={url} className={style.popup_item}>
		{Icon}
		<Text>{title}</Text>
	</Link>
);

interface ExtenderI {
	title: string;
	children: React.ReactNode[];
}

const Extender = ({ children, title }: ExtenderI) => {
	const [isOpen, setIsOpen] = useState(true);
	const arrow_class = isOpen ? style.arrow_open : style.arrow_closed;

	if (!children.length) return null;

	return (
		<div className={style.extender_container}>
			<PagePadding>
				<div className={style.extender_header} onClick={() => setIsOpen(!isOpen)}>
					<ArrowIcon className={arrow_class} />
					<Text>{title}</Text>
				</div>
			</PagePadding>
			{isOpen && (
				<ListContainer rowSpacing={3} columnSpacing={2} childWidth={224}>
					{children}
				</ListContainer>
			)}
		</div>
	);
};

interface ListI {
	created_at: Date | string;
}

const sortListItems = (a: ListI, b: ListI) => {
	if (a.created_at > b.created_at) return -1;
	if (a.created_at < b.created_at) return 1;
	return 0;
};

const Home = () => {
	const decks = useStore(state => state.decks);
	const webEntries = useStore(state => state.content);

	const [createPopupOpen, setCreatePopupOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(popupRef, () => setCreatePopupOpen(false));

	const DeckListComponents = decks
		.sort(sortListItems)
		.map((deck, idx) => <Deck deck={deck} key={idx} />);

	const ContentListComponents = webEntries
		.sort(sortListItems)
		.map((webEntry, idx) => <ContentCard content={webEntry} key={idx} />);

	const showHint = !DeckListComponents.length && !ContentListComponents.length;

	return (
		<Layout width="full">
			<PagePadding>
				<ContentTitle>
					<Header kind="h2">Your Decks</Header>
					<FloatingButton
						id="create_button"
						action={() => setCreatePopupOpen(!createPopupOpen)}
					/>
					{createPopupOpen && (
						<Popup ref={popupRef} className={style.create_card_popup_container}>
							<PopupItem title="Deck" url="/deck/new" Icon={<CardDeckIcon />} />
							<PopupItem title="Content" url="/deck/new?type=url" Icon={<Content />} />
						</Popup>
					)}
				</ContentTitle>
			</PagePadding>
			<Spacer spacing={2} />
			<Extender title="Decks">{DeckListComponents}</Extender>
			<Extender title="Content">{ContentListComponents}</Extender>
			{showHint && <Hint>No decks yet. Click the plus button to add a deck.</Hint>}
		</Layout>
	);
};

export default Home;
