import CustomTag from "components/CustomTag";

import style from "./style.module.scss";

interface SimpleButtonProps {
	children: React.ReactChild;
	className?: string;
	as: React.ElementType;
	[key: string]: unknown;
}

const SimpleButton = ({
	children,
	as,
	className,
	...rest
}: SimpleButtonProps) => {
	const props = {
		className: `${style.simple_button} ${className ? className : ""}`,
		...rest,
	};
	return (
		<CustomTag tag={as} {...props}>
			{children}
		</CustomTag>
	);
};

export default SimpleButton;
