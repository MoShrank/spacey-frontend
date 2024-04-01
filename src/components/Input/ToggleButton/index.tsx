import { useState } from "react";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface ToggleButtonI {
	defaultActive?: number;
	buttonNames: string[];
	onClick: (buttonNames: string) => void;
}

const ToggleButton = ({
	defaultActive = 0,
	buttonNames,
	onClick,
}: ToggleButtonI) => {
	const [activeButton, setActiveButton] = useState(defaultActive);

	const handleActive = (index: number) => {
		setActiveButton(index);
		onClick(buttonNames[index]);
	};

	return (
		<div className={style.toggle_button_container}>
			{buttonNames.map((buttonName, index) => (
				<button
					key={index}
					className={
						activeButton === index
							? combineStyles(style.active, style.button)
							: style.button
					}
					onClick={() => handleActive(index)}
				>
					{buttonName}
				</button>
			))}
		</div>
	);
};

export default ToggleButton;
