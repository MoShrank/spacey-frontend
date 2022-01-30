import RedirectAuth from "components/RedirectAuth/RedirectAuth";
import RequireAuth from "components/RequireAuth/RequireAuth";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import Logout from "pages/Logout";
import NewDeck from "pages/NewDeck";
import { Outlet, Route, Routes } from "react-router-dom";
import { store } from "store/store";
import { getLoggedInState } from "util/user";
import { useGlobalState } from "store/store";
import "./App.scss";
import Navbar from "components/Navbar";
import GlobalErrorPopup from "components/GlobalErrorPopup";
import GlobalError from "events/globalError";
import { useEffect } from "react";

const initialState = {
    isLoggedIn: getLoggedInState(),
    user: {
        id: "",
        name: "",
        email: "",
    },
    config: {
        colors: [],
    },
    globalError: false,
};

store.init(initialState);

function NavbarLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}

function App() {
    /* using useGlobalState + conditional rendering depedent on that state
    somehow does not work and triggers and infinite rerendering */

    const [globalError, setGlobalError] = useGlobalState("globalError");
    const [isLoggedIn] = useGlobalState("isLoggedIn");

    useEffect(() => {
        GlobalError.setRenderCallback(setGlobalError);
    }, []);

    return (
        <div className="App">
            {isLoggedIn && <Navbar />}
            {globalError && <GlobalErrorPopup />}
            <div className="content">
                <Routes>
                    <Route path="/" element={<NavbarLayout />}>
                        <Route
                            path="/"
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/new/deck"
                            element={
                                <RequireAuth>
                                    <NewDeck />
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path="/logout"
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
