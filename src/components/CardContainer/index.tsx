import style from "./style.module.scss";

interface CardInputProps {
	children?: React.ReactNode;
	color: string;
}

const CardContainer = ({ children, color }: CardInputProps) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className={style.card_input_container}
		>
			{children}
			<span className={style.line} />
		</div>
	);
};

export default CardContainer;
