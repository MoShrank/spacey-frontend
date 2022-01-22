import "./style.scss";
import { ReactComponent as Icon } from "../../assets/icons/logout.svg";
import { logout } from "api/user";
import { store, useGlobalState } from "store/store";

const Logout = () => {
    const [, setIsLoggedIn] = useGlobalState("isLoggedIn");

    const handleClick = () => {
        logout();
        store.clearState();
        setIsLoggedIn(false);
    };

    return (
        <div onClick={handleClick} className="logout_container">
            <div className="logout_text">Logout</div>
            <Icon />
        </div>
    );
};

export default Logout;
