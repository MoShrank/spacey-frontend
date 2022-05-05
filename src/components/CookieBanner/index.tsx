import { ReactComponent as CookieIcon } from "assets/icons/cookie.svg";
import PopupContainer from "components/GlobalPopup/PopupContainer";
import ContentHeader from "components/GlobalPopup/PopupHeader";
import Modal from "components/Modal";
import Text from "components/Text";

import style from "./style.module.scss";

interface CookieBannerProps {
	onClick: () => void;
}

const CookieBanner = ({ onClick }: CookieBannerProps) => {
	return (
		<Modal>
			<PopupContainer position="bottom">
				<ContentHeader>
					<CookieIcon className={style.cookieIcon} />
					<Text color="black" className={style.bannertext}>
						&nbsp;Spacey uses Cookies.&nbsp;
					</Text>
					<Text color="black" className={style.linktext} onClick={onClick}>
						Ok.
					</Text>
				</ContentHeader>
			</PopupContainer>
		</Modal>
	);
};

export default CookieBanner;
