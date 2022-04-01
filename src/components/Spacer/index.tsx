interface SpacerPropsI {
	spacing: number;
}

const singleSpacing = 8;

const Spacer = ({ spacing }: SpacerPropsI) => {
	return <div style={{ height: `${singleSpacing * spacing}px` }} />;
};

export default Spacer;
