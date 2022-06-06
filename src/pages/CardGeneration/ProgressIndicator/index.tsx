import Header from "components/Header";
import Text from "components/Text";
import useMediaQuery from "hooks/useMediaQuery";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

const getState = (state: number, currentState: number) => {
	if (state === currentState) return "current";
	if (state < currentState) return "done";
	return "todo";
};

interface LineI {
	done?: boolean;
}

const Line = ({ done }: LineI) => (
	<div
		className={combineStyles(style.line, done ? style.done : undefined)}
	></div>
);

interface StepI {
	number: number;
	title: string;
	state: "done" | "current" | "todo";
}

const Step = ({ number, title, state }: StepI) => {
	const matches = useMediaQuery("(max-width: 500px)");

	if (matches) {
		return <div className={combineStyles(style.step_mobile, style[state])}></div>;
	} else {
		return (
			<div className={combineStyles(style.step, style[state])}>
				<Header kind="h3" className={style.number}>
					{number}
				</Header>
				<Text className={style.title}>{title}</Text>
			</div>
		);
	}
};

interface ProgressIndicatorI {
	currentState: number;
}

const STATES = {
	1: "Enter Text",
	2: "Generating Cards",
	3: "Review Cards",
};

const ProgressIndicator = ({ currentState }: ProgressIndicatorI) => {
	return (
		<div className={style.container}>
			<Step number={1} title={STATES[1]} state={getState(1, currentState)}></Step>
			<Line done={currentState > 1} />
			<Step number={2} title={STATES[2]} state={getState(2, currentState)}></Step>
			<Line done={currentState > 2} />
			<Step number={3} title={STATES[3]} state={getState(3, currentState)}></Step>
		</div>
	);
};

export default ProgressIndicator;
