import style from "./style.module.scss";

interface Props {
	colors: string[];
	onClickColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedColor: string;
}

const ColorInput = ({ colors, onClickColor, selectedColor }: Props) => {
	return (
		<div className={style.color_input_container}>
			<div className={style.label_overlay_container}>
				<span className={style.line} />
				<label>color</label>
			</div>
			{colors.map((color: string) => {
				return (
					<input
						type="radio"
						key={color}
						className={`${style.color} ${
							color === selectedColor ? style.selected : ""
						}`}
						style={{ background: color }}
						name={color}
						id={color}
						onChange={onClickColor}
						checked={color === selectedColor}
					/>
				);
			})}
		</div>
	);
};

export default ColorInput;
