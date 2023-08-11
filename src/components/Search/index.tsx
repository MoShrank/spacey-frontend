import { searchWebContentAction } from "actions/webContent";
import TextInput from "components/Input/TextInput";
import Loader from "components/Loader";
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";

import style from "./style.module.scss";

const DEBOUNCE_TIME_MS = 300;

const Search = () => {
	const [query, setQuery] = useState("");

	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // for debouncing

	const resetSearchResults = useStore(state => state.resetSearchResults);

	const [loading, , searchWebContent] = useActionZ(
		state => state.searchResults,
		searchWebContentAction,
	);

	useEffect(() => {
		if (query.length >= 3) {
			if (timer) {
				clearTimeout(timer);
			}

			const newTimer = setTimeout(async () => {
				await searchWebContent(query);
			}, DEBOUNCE_TIME_MS);

			setTimer(newTimer);
		} else {
			console.log("resetting");
			resetSearchResults();
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [query]);

	return (
		<div className={style.search_container}>
			<TextInput
				placeholder="search"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<div className={style.result_container}>{loading && <Loader />}</div>
		</div>
	);
};

export default Search;
