import { ForwardRefExoticComponent } from "react";

type customTagT =
	| string
	| React.ComponentClass
	| React.FunctionComponent
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ForwardRefExoticComponent<any>;

export default customTagT;
