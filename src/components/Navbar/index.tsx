import { useEffect, useState } from "react";
import { useGlobalState } from "store/store";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import style from "./style.module.scss";

const Navbar = () => {
	const [isLoggedIn] = useGlobalState<string>("isLoggedIn");
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 500);

	const Nav = isDesktop ? DesktopNavbar : MobileNavbar;

	useEffect(() => {
		const onChange = () => {
			setIsDesktop(window.innerWidth >= 500);
		};

		window.addEventListener("resize", onChange);

		return () => {
			window.removeEventListener("resize", onChange);
		};
	}, []);

	return <nav className={style.container}>{isLoggedIn && <Nav />}</nav>;
};

export default Navbar;
