interface SpacerPropsI {
	spacing: number;
	direction?: "row" | "column";
}

const singleSpacing = 8;

const Spacer = ({ spacing, direction = "column" }: SpacerPropsI) => {
	const size = `${singleSpacing * spacing}px`;
	const sizeStyle =
		direction == "row"
			? { width: size, minWidth: size }
			: { height: size, minHeight: size };

	return <span style={{ ...sizeStyle, display: "block" }} />;
};

export default Spacer;
