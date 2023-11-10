import { ReactComponent as ArticleIcon } from "assets/icons/article.svg";
import { ReactComponent as CardDeckIcon } from "assets/icons/card_deck.svg";
import ArticleCard from "components/ArticleCard";
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
import { DeckI } from "types/deck";
import { WebEntryI } from "types/web_entry";

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

const Home = () => {
	const decks = useStore(state => state.decks);
	const webEntries = useStore(state => state.webContent);

	const searchResults = useStore(state => state.searchResults);

	const [createPopupOpen, setCreatePopupOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);

	const listItems = [
		...decks.map(deck => ({ type: "deck", data: deck })),
		...webEntries.map(webEntry => ({ type: "webEntry", data: webEntry })),
	];
	listItems.sort((a, b) => {
		if (a.data.created_at > b.data.created_at) return -1;
		if (a.data.created_at < b.data.created_at) return 1;
		return 0;
	});

	useOnClickOutside(popupRef, () => setCreatePopupOpen(false));

	let ListItems = null;

	if (searchResults.length) {
		ListItems = (
			<>
				{searchResults.map((item: WebEntryI, idx) => (
					<ArticleCard key={idx} webEntry={item} />
				))}
			</>
		);
	} else {
		ListItems = (
			<>
				{listItems.map((item, idx) => {
					return item.type === "deck" ? (
						<Deck key={idx} deck={item.data as DeckI} />
					) : (
						<ArticleCard key={idx} webEntry={item.data as WebEntryI} />
					);
				})}
			</>
		);
	}

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
							<PopupItem
								title="Article"
								url="/deck/new?type=url"
								Icon={<ArticleIcon />}
							/>
						</Popup>
					)}
				</ContentTitle>
			</PagePadding>
			<Spacer spacing={2} />
			{listItems.length ? (
				<ListContainer rowSpacing={3} columnSpacing={2} childWidth={224}>
					{ListItems}
				</ListContainer>
			) : (
				<Hint>No decks yet. Click the plus button to add a deck.</Hint>
			)}
		</Layout>
	);
};

export default Home;
