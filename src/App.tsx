import RedirectAuth from "components/RedirectAuth/RedirectAuth";
import RequireAuth from "components/RequireAuth/RequireAuth";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { store } from "store/store";
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
    return (
        <div className="App">
            <div id="global_error_popup" className="global_error">
                Error
            </div>
            <header className="App-header"></header>
            <div className="screen">
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
