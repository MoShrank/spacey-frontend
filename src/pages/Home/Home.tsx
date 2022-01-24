import { getUserData } from "api/user";
import { useEffect } from "react";
import { useGlobalState } from "store/store";

const Home = () => {
    const [user, setUser] = useGlobalState("user");
    const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

    useEffect(() => {
        if (isLoggedIn) {
            getUserData().then((user) => {
                setUser(user);
            });
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>Hello {user.name}</p>
        </div>
    );
};

export default Home;
