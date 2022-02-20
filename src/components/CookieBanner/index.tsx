import { ReactComponent as CookieIcon } from "assets/icons/cookie.svg";
import Text from "components/Text";

import style from "./style.module.scss";

interface CookieBannerProps {
	onClick: () => void;
}

const CookieBanner = ({ onClick }: CookieBannerProps) => {
	return (
		<div className={style.container}>
			<CookieIcon className={style.cookieIcon} />
			<Text color="black" className={style.bannertext}>
				&nbsp;Spacey uses Cookies.&nbsp;
			</Text>
			<Text color="black" className={style.linktext} onClick={onClick}>
				Ok.
			</Text>
		</div>
	);
};

export default CookieBanner;
