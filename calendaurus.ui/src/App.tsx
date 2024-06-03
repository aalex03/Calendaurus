import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { MainPage } from './Pages/MainPage';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
    </div>
  );
}

export default App;
