import { useEffect, useState } from "react";

import style from "./style.module.scss";

interface ReadProgressI {
	scrollContainerID: string;
	onFinishedScrolling?: () => void;
}

const ReadProgress: React.FC<ReadProgressI> = ({
	scrollContainerID,
	onFinishedScrolling,
}) => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const scrollContainer = document.getElementById(scrollContainerID);
		if (!scrollContainer) return;

		const onScroll = () => {
			const scrollTop = scrollContainer.scrollTop;

			const scrollHeight =
				scrollContainer.scrollHeight - scrollContainer.clientHeight;
			const progress = (scrollTop / scrollHeight) * 100;
			setScrollProgress(Math.round(progress * 100) / 100);

			if (progress === 100 && onFinishedScrolling) {
				onFinishedScrolling();
			}
		};

		scrollContainer.addEventListener("scroll", onScroll);

		return () => {
			scrollContainer.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			style={{ width: `${scrollProgress}vw` }}
			className={style.scroll_progress_bar}
		/>
	);
};

export default ReadProgress;
