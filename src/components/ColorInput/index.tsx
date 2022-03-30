import "./style.scss";

interface Props {
	colors: string[];
	onClickColor: (color: string) => void;
	selectedColor: string;
}

const ColorInput = ({ colors, onClickColor, selectedColor }: Props) => {
	return (
		<div className="color_input_container">
			<div className="label_overlay_container">
				<span className="line" />
				<label>color</label>
			</div>

			{colors.map((color: string) => {
				return (
					<div
						key={color}
						className={`color ${color === selectedColor && "selected"}`}
						style={{ background: color }}
						onClick={() => {
							onClickColor(color);
						}}
					/>
				);
			})}
		</div>
	);
};

export default ColorInput;
