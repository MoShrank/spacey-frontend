import React from "react";

import customTag from "./type";

interface CustomTagI {
	tag: customTag;
	children: React.ReactNode;
}

const CustomTag = ({ tag, children, ...props }: CustomTagI) => {
	return React.createElement(tag, props, children);
};

export default CustomTag;
