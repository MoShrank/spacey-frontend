import "./style.scss";

import InfoTriangle from "assets/icons/infoTriangle.png";

const GlobalErrorPopup = () => {
    return (
        <div id="global_error_popup" className="global_error">
            <div className="error_header">
                <img src={InfoTriangle} alt="info triangle" />
                <p className="error_title">no connection to the server</p>
            </div>
            <p className="error_subtitle">please try again in a few seconds</p>
            <span id="bar" className="bar" />
        </div>
    );
};

export default GlobalErrorPopup;
