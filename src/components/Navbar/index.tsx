import Logout from "components/Logout";
import { Link } from "react-router-dom";
import HomeIcon from "assets/icons/home.png";

import "./style.scss";

const Navbar = () => {
    return (
        <div className="navbar_container">
            <Link to="/">
                <img src={HomeIcon} alt="home icon" />
            </Link>
            <Logout />
        </div>
    );
};

export default Navbar;
