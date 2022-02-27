import React from "react";

import style from "./style.module.scss";

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className={style.container}>{children}</div>;
};

export default HeaderContainer;
