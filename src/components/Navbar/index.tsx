import useStore from "hooks/useStore";
import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import style from "./style.module.scss";

const Navbar = () => {
	const isLoggedIn = useStore(state => state.isLoggedIn);
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
