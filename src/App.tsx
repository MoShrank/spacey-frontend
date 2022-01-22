import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { store } from "store/store";
import "./App.scss";

const initialState = {
    isLoggedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
    },
};

store.init(initialState);

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <div className="screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
