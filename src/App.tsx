import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <div className="screen">
                <Routes>
                    <Route path="/" element={null} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
