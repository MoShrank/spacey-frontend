import { ReactComponent as ArrowIcon } from "assets/icons/arrow.svg";
import { ReactComponent as CreateIcon } from "assets/icons/create.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as GenerateIcon } from "assets/icons/generate.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import { ReactComponent as LearnIcon } from "assets/icons/learn.svg";
import CardCount from "components/CardCount/CardCount";
import CardListItem from "components/CardListItem";
import ContentTitle from "components/ContentTitle";
import ContentWidthConstraint from "components/ContentWidthConstraint";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import Hint from "components/Hint";
import Layout from "components/Layout";
import Line from "components/Line";
import ListContainer from "components/ListContainer";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import Popup from "components/Popup";
import SecondaryButton from "components/SecondaryButton";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "store/store";
import colors from "styles/colors";
import { DeckI } from "types/deck";
import { UserI } from "types/user";

import style from "./style.module.scss";

const emptyDeckPlaceholder =
	"No description yet. Click the edit button to add a description.";

interface PopupItemI {
	Icon: React.ReactNode;
	title: string;
	url: string;
	unauthorized?: boolean;
}

const PopupItem = ({ Icon, title, url, unauthorized }: PopupItemI) => {
	return (
		<div className={unauthorized ? style.unauthorized : ""}>
			<Link to={url} className={unauthorized ? style.disabled : ""}>
				<div className={style.popup_item}>
					{unauthorized && <div className={style.beta}>beta</div>}
					{Icon}
					<Text>{title}</Text>
				</div>
			</Link>
		</div>
	);
};

const DeckDetail = () => {
	const { deckID } = useParams();

	const [createPopupOpen, setCreatePopupOpen] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);

	const [user] = useGlobalState<UserI>("user");
	const [decks] = useGlobalState<DeckI[]>("decks");

	const infoRef = useRef<HTMLDivElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	useOnClickOutside(infoRef, () => setInfoOpen(false));
	useOnClickOutside(popupRef, () => setCreatePopupOpen(false));

	const deck = decks.find(deck => deck.id === deckID);

	if (!deck) {
		return <Navigate to="/404" />;
	}

	return (
		<Layout width="full">
			<ContentWidthConstraint>
				<div className={style.deck_detail_header}>
					<ArrowIcon onClick={() => navigate("/")} />
					<Spacer spacing={2} direction="row" />
					<Text color="darkblue">{deck.name}</Text>
					{infoOpen && (
						<Popup ref={infoRef} className={style.description_popup}>
							{
								<Text color={deck.description ? "black" : "lightgrey"}>
									{deck.description || emptyDeckPlaceholder}
								</Text>
							}
						</Popup>
					)}
					<InfoIcon
						className={style.info_icon}
						id="info_icon"
						onClick={() => setInfoOpen(!infoOpen)}
						fill={colors.darkblue}
					/>
					<Spacer spacing={1} direction="row" />
					<Link to="edit">
						<EditIcon />
					</Link>
				</div>
				<Spacer spacing={2} />
				<MemoryStabilityIndicator
					probability={deck.averageRecallProbability}
					styles={{ width: "24px", height: "24px" }}
					fill={"darkblue"}
				></MemoryStabilityIndicator>
				<Spacer spacing={2} />
				<Line />
				<Spacer spacing={2} />
				<ContentTitle>
					<Header kind="h2">Your Cards</Header>
					<FloatingButton
						id="create_button"
						action={() => setCreatePopupOpen(!createPopupOpen)}
					/>
					{createPopupOpen && (
						<Popup ref={popupRef} className={style.create_card_popup_container}>
							<PopupItem title="Create" url="card/new" Icon={<CreateIcon />} />
							<PopupItem
								title="Generate"
								url="card/generate"
								unauthorized={!user.betaUser}
								Icon={<GenerateIcon />}
							/>
						</Popup>
					)}
				</ContentTitle>
				<Spacer spacing={2} />
				<CardCount count={deck.cards.length} />
			</ContentWidthConstraint>
			<Spacer spacing={1} />
			{deck.cards.length ? (
				<ListContainer spacing={2}>
					{deck.cards.map(card => (
						<CardListItem
							as={Link}
							to={`cards/${card.id}`}
							key={card.id}
							color={deck.color}
							answer={card.answer}
							question={card.question}
						/>
					))}
				</ListContainer>
			) : (
				<Hint>No cards yet. Click the plus button to add a card.</Hint>
			)}
			{deck.cards.length > 0 && (
				<Link className={style.floating_container} to={`/learn/${deckID}`}>
					<SecondaryButton onClick={undefined} backgroundColor="darkblue">
						<LearnIcon />
						<Text color="white">Learn</Text>
					</SecondaryButton>
				</Link>
			)}
		</Layout>
	);
};

export default DeckDetail;
