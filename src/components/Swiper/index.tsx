import { ReactComponent as ArrowIcon } from "assets/icons/arrow.svg";
import Text from "components/Text";

import style from "./style.module.scss";

interface SwiperI {
	children: React.ReactNode;
	handlePrev: () => void;
	handleNext: () => void;
}

const Swiper = ({ handlePrev, handleNext, children }: SwiperI) => (
	<div className={style.swipe_container}>
		<ArrowIcon onClick={handlePrev} />
		<Text color="lightgrey">{children}</Text>
		<ArrowIcon onClick={handleNext} />
	</div>
);

export default Swiper;
