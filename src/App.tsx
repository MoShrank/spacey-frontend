import RedirectAuth from "components/RedirectAuth/RedirectAuth";
import RequireAuth from "components/RequireAuth/RequireAuth";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import Logout from "pages/Logout";
import { Route, Routes } from "react-router-dom";
import { store, useGlobalState } from "store/store";
import { getLoggedInState } from "util/user";
import "./App.scss";

const initialState = {
    isLoggedIn: getLoggedInState(),
    user: {
        id: "",
        name: "",
        email: "",
    },
};

store.init(initialState);

function App() {
    const [isLoggedIn] = useGlobalState("isLoggedIn");

    return (
        <div className="App">
            <div id="global_error_popup" className="global_error">
                Error
            </div>
            {isLoggedIn && <Logout />}
            <header className="App-header"></header>
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Logout />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <RedirectAuth>
                                <Login />
                            </RedirectAuth>
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <RedirectAuth>
                                <SignUp />
                            </RedirectAuth>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
