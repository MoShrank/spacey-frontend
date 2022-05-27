import React from "react";

export type CustomTagI<C extends React.ElementType> = {
	tag?: C;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

const CustomTag = <C extends React.ElementType>({
	tag,
	children,
	...rest
}: CustomTagI<C>) => {
	const Component = tag || "span";
	return <Component {...rest}>{children}</Component>;
};

export default CustomTag;
