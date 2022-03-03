import style from "./style.module.scss";

const ProgressIndicator = ({
	total,
	progress,
}: {
	total: number;
	progress: number;
}) => {
	const singleWidth = 100 / total;
	const bars = Array.from(Array(progress).keys());
	return (
		<div className={style.container}>
			{bars.map((_, idx) => {
				return (
					<span
						style={{ width: `${singleWidth}%` }}
						className={`${style.bar} ${
							idx + 1 === bars.length && bars.length === total ? style.last_bar : null
						}`}
						key={idx}
					/>
				);
			})}
		</div>
	);
};

export default ProgressIndicator;
