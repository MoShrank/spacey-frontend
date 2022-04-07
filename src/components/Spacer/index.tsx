interface SpacerPropsI {
	spacing: number;
}

const singleSpacing = 8;

const Spacer = ({ spacing }: SpacerPropsI) => {
	const height = `${singleSpacing * spacing}px`;
	return (
		<span style={{ height: height, minHeight: height, display: "block" }} />
	);
};

export default Spacer;
