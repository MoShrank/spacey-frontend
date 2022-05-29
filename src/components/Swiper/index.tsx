import { ReactComponent as ArrowIcon } from "assets/icons/arrow.svg";
import ResponsiveIcon from "components/ResponsiveIcon";
import Text from "components/Text";
import useSwiping from "hooks/useSwiping";

import style from "./style.module.scss";

interface SwiperI {
	children: React.ReactNode;
	handlePrev: () => void;
	handleNext: () => void;
}

const Swiper = ({ handlePrev, handleNext, children }: SwiperI) => {
	useSwiping(handlePrev, handleNext);

	return (
		<div className={style.swipe_container}>
			<ResponsiveIcon icon={ArrowIcon} onClick={handlePrev} />
			<Text color="lightgrey">{children}</Text>
			<ResponsiveIcon icon={ArrowIcon} onClick={handleNext} />
		</div>
	);
};

export default Swiper;
