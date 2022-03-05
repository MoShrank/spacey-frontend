import { ComponentProps } from "react";

import style from "./style.module.scss";

interface checkboxProps extends ComponentProps<"input"> {
	error?: string;
	children: React.ReactNode;
}

const Checkbox = (props: checkboxProps) => {
	const { error, children, ...rest } = props;
	return (
		<label className={style.label}>
			<input
				className={`${style.checkbox} ${error ? style.error : ""}`}
				type="checkbox"
				{...rest}
			/>
			{children}
		</label>
	);
};

export default Checkbox;
