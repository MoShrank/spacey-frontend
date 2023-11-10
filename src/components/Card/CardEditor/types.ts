export type CustomElement = {
	type: string;
	children: CustomText[];
	align?: "left" | "center" | "right" | "justify";
};

export type CustomText = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	code?: boolean;
};
