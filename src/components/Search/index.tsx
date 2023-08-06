import { searchWebEntries } from "api/webContent";
import TextInput from "components/Input/TextInput";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WebEntryI } from "types/web_entry";

import style from "./style.module.scss";

const DEBOUNCE_TIME_MS = 300;

// TODO: filter items in list view instead of popping up a box --> new state for item and searchResultItems. Items need to be reset on unmount or when char < 3

const Search = () => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [data, setData] = useState<WebEntryI[] | null>(null);

	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // for debouncing

	useEffect(() => {
		if (query.length >= 3) {
			if (timer) {
				clearTimeout(timer);
			}

			setLoading(true);
			setError(false);

			const newTimer = setTimeout(async () => {
				try {
					const res = await searchWebEntries(query);
					setData(res);
					setLoading(false);
				} catch (error) {
					setError(true);
					setLoading(false);
				}
			}, DEBOUNCE_TIME_MS);

			setTimer(newTimer);
		} else {
			setData(null);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [query]);

	let Content = null;

	switch (true) {
		case loading:
			Content = <Loader />;
			break;
		case error:
			Content = <div>Could not fetch results!</div>;
			break;
		case data && data.length === 0:
			Content = <div>No results found!</div>;
			break;
		case data && data.length > 0:
			Content = data?.map(item => (
				<Link to={`article/${item.id}`} key={item.id}>
					<div className={style.item}>{item.name}</div>
				</Link>
			));
			break;
		default:
			break;
	}

	return (
		<div className={style.search_container}>
			<TextInput
				placeholder="search"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<div className={style.result_container}>{Content}</div>
		</div>
	);
};

export default Search;
