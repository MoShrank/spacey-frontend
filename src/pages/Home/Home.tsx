import { useGlobalState } from "store/store";

const Home = () => {
    const [user] = useGlobalState("user");
    return (
        <div>
            <h1>Home</h1>
            <p>Hello {user.name}</p>
        </div>
    );
};

export default Home;
