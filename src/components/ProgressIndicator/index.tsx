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
			{bars.map(bar => {
				return (
					<span
						style={{ width: `${singleWidth}%` }}
						className={style.bar}
						key={bar}
					/>
				);
			})}
		</div>
	);
};

export default ProgressIndicator;
