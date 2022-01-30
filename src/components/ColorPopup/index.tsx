import "./style.scss";

interface Props {
	colors: string[];
	onClickColor: (color: string) => void;
	selectedColor: string;
}

const ColorPopup = ({ colors, onClickColor, selectedColor }: Props) => {
	return (
		<div className="color_popup_container">
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

export default ColorPopup;
