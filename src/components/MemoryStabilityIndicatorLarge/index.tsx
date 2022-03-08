import { ReactComponent as MemoryStabilityIconEmptyLarge } from "assets/icons/memoryStabilityIconEmptyLarge.svg";
import { ReactComponent as MemoryStabilityIconFullLarge } from "assets/icons/memoryStabilityIconFullLarge.svg";

import style from "./style.module.scss";

interface MemoryStabilityIndicatorLargeProps {
	level: number;
}

const MemoryStabilityIndicatorLarge = (
	props: MemoryStabilityIndicatorLargeProps,
) => {
	const indicatorLarge = [];
	let i = 1;
	while (i <= 4) {
		indicatorLarge.push(
			(i <= props.level && <MemoryStabilityIconFullLarge />) || (
				<MemoryStabilityIconEmptyLarge />
			),
		);
		i++;
	}
	return <div className={style.indicator_large}>{indicatorLarge}</div>;
};

export default MemoryStabilityIndicatorLarge;
