import style from "./style.module.scss";

interface CardInputProps {
	children?: React.ReactNode;
}

const CardContainer = ({ children }: CardInputProps) => {
	return (
		<div className={style.card_input_container}>
			{children}
			<span className={style.line} />
		</div>
	);
};

export default CardContainer;
