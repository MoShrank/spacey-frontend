import { ReactComponent as MemoryStabilityIconEmpty } from "assets/icons/memoryStabilityIconEmpty.svg";
import { ReactComponent as MemoryStabilityIconFull } from "assets/icons/memoryStabilityIconFull.svg";
import colors from "styles/colors";

import style from "./style.module.scss";

interface MemoryStabilityIndicatorProps {
	probability: number;
	styles?: React.CSSProperties;
	fill?:
		| "blue"
		| "lightblue"
		| "lightgray"
		| "rederror"
		| "darkblue"
		| "darkgray";
}

const MemoryStabilityIndicator = (props: MemoryStabilityIndicatorProps) => {
	const fill = props.fill ? colors[props.fill] : colors.darkblue;
	const level = Math.round(props.probability * 4);
	const emptyArr = [...Array(4)];
	return (
		<div className={style.indicator}>
			{emptyArr.map((_, idx) =>
				idx <= level ? (
					<MemoryStabilityIconFull style={props.styles} fill={fill} />
				) : (
					<MemoryStabilityIconEmpty style={props.styles} />
				),
			)}
		</div>
	);
};

export default MemoryStabilityIndicator;
