import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <Routes>
        <Route path="/" element={null} />
        <Route path="login" element={null} />
      </Routes>
    </div>
  );
}

export default App;
