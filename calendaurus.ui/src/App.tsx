import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { Header } from './Components/Header';
import { MainPage } from './Pages/MainPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Login } from '@mui/icons-material';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage name={''} lastName={''} />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
    </div>
  );
}

export default App;
