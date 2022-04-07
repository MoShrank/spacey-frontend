import InfoTriangle from "assets/icons/infoTriangle.svg";
import { PopupErrorI } from "events/globalError";
import { useGlobalState } from "store/store";

import "./style.scss";

const GlobalErrorPopup = () => {
	const [globalError] = useGlobalState<PopupErrorI>("globalError");

	return (
		<div id="global_error_popup" className="global_error">
			<div className="error_header">
				<img src={InfoTriangle} alt="info triangle" />
				<p className="error_title">{globalError.msg}</p>
			</div>
			<p className="error_subtitle">{globalError.hint}</p>
			<span id="bar" className="bar" />
		</div>
	);
};

export default GlobalErrorPopup;
