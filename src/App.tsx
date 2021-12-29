import Login from "pages/Login/Login";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>

            <Routes>
                <Route path="/" element={null} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
