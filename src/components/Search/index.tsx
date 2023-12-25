import { QueryResultI, search } from "api/search";
import { ReactComponent as AccountIcon } from "assets/icons/account.svg";
import { ReactComponent as CloseIcon } from "assets/icons/exit.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import TextInput from "components/Input/TextInput";
import Text from "components/Text";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

type Origin = "gpt" | "user";

type ContentType = "web" | "pdf";

interface QueryResultsI {
	type: ContentType;
	urls: Array<string>;
	ids: Array<string>;
}

interface MessageI {
	id: string;
	origin: Origin;
	value: string;
	queryResults: Array<QueryResultsI>;
}

interface MessageProps {
	messages: MessageI[];
	isLoading: boolean;
	// eslint-disable-next-line
	onClose: (e: any) => void;
}

const buildQueryResultLinks = (queryResults: QueryResultI) => {
	let prefix = "";

	switch (queryResults.type) {
		case "pdf":
			prefix = "pdf";
			break;
		case "web":
			prefix = "article";
			break;
	}

	return queryResults.ids.map(id => `/${prefix}/${id}`);
};

const buildQueryResults = (
	queryResults: Array<QueryResultI>,
): QueryResultsI[] => {
	const mappedQR = queryResults.map(queryResult => {
		return {
			type: queryResult.type as ContentType,
			urls: buildQueryResultLinks(queryResult),
			ids: queryResult.ids,
		};
	});

	return mappedQR;
};

const QueryResultItem = ({ url, name }: { url: string; name: string }) => {
	return (
		<Link to={url} className={style.query_result_item_container}>
			{name}
		</Link>
	);
};

const Messages = ({ messages, isLoading, onClose }: MessageProps) => {
	if (messages.length === 0) return null;

	return (
		<div className={style.messages_container}>
			<div className={style.messages_head}>
				<CloseIcon onClick={onClose} />
			</div>
			{messages.map((message, index) => {
				return (
					<div key={index} className={style.message_container}>
						{message.origin === "gpt" ? (
							<>
								<Text className={style.message_gpt}>{message.value}</Text>
								{message.queryResults.length > 0 && (
									<div className={style.query_results_container}>
										{message.queryResults.map((qr, idx) => (
											<QueryResultItem key={idx} name={qr.type} url={qr.urls[0]} />
										))}
									</div>
								)}
							</>
						) : (
							<Text className={style.message_user}>
								{message.value}
								<AccountIcon />
							</Text>
						)}
					</div>
				);
			})}
			{isLoading && <div className={style.message_gpt}>...</div>}
		</div>
	);
};

const initialMessages: Array<MessageI> = [
	{
		id: "0",
		origin: "gpt",
		value: "Hello, how can I help you?",
		queryResults: [],
	},
];

const Search = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const [query, setQuery] = useState("");

	const [messages, setMessages] = useState<Array<MessageI>>(initialMessages);
	const [newMessageLoading, setNewMessageLoading] = useState(false);

	const debouncedSetIsHover = debounce(setIsHover, 50);

	const onMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			if (!isOpen) {
				debouncedSetIsHover(false);
			}
		},
		[isOpen, isHover],
	);

	const onMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			debouncedSetIsHover(true);
		},
		[isHover],
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (query === "" || newMessageLoading) {
			return;
		}

		const message: MessageI = {
			id: messages.length.toString(),
			origin: "user",
			value: query,
			queryResults: [],
		};

		const newMessages = [...messages, message];

		setQuery("");
		setMessages(newMessages);

		setNewMessageLoading(true);
		const results = await search(query);
		setNewMessageLoading(false);

		const queryResults = buildQueryResults(results.search_results || []);

		const answerMessage: MessageI = {
			id: messages.length.toString(),
			origin: "gpt",
			value: results.answer,
			queryResults: queryResults,
		};
		setMessages([...newMessages, answerMessage]);
	};

	const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		setIsHover(false);
	};

	return (
		<div
			className={style.search_container}
			onClick={() => setIsOpen(true)}
			onMouseOver={onMouseEnter}
			onMouseOut={onMouseLeave}
		>
			<div
				className={`${style.search_expandable} ${isOpen ? style.expanded : ""}`}
			>
				{isHover || isOpen ? (
					<>
						{isOpen && (
							<Messages
								onClose={onClose}
								messages={messages}
								isLoading={newMessageLoading}
							/>
						)}
						<form onSubmit={handleSubmit}>
							<TextInput
								className={
									isOpen && messages.length > 0 ? style.input : style.input_empty
								}
								placeholder="search"
								value={query}
								onChange={e => setQuery(e.target.value)}
							/>
						</form>
					</>
				) : (
					<div className={style.floating_button}>
						<SearchIcon />
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
