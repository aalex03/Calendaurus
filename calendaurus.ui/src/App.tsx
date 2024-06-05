import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { MainPage } from './Pages/MainPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./Api/authConfig";
import { PublicClientApplication } from '@azure/msal-browser';
function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const signIn = async () => {
    try {
      // Login logic using MSAL
      const loginResponse = await instance.loginPopup(loginRequest);
      sessionStorage.setItem(
        "user",
        JSON.stringify(loginResponse.account)
      );
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={"/home"}/> : <LoginPage signIn = {signIn}/>} />
        <Route path="/home" element={isAuthenticated ? <MainPage instance={instance}/> : <Navigate to={"/"}/>} />
      </Routes>
    </div>
  );
}

export default App;
