import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import QnA from './pages/QnA';
import DataBase from './pages/Database';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import api from './axios/Api.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      let accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      console.log("액세스토큰: ", accessToken);
      console.log("리프레시 토큰: ", refreshToken);

      if (!accessToken) {
        if (!refreshToken) {
          navigate("/signin");
          return;
        }

        try {
          const response = await api.post("/user/refresh", { refreshToken });
          accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
        } catch (error) {
          console.error("토큰 갱신 실패", error);
          navigate("/signin");
          return;
        }
      }

      setUser({ loggedIn: true });
    };

    checkAndRefreshToken();
  }, [navigate]);

  return (
      <Routes>
        <Route path="/" element = {<LandingPage user={user}/>} />
        <Route path="/signin" element = {<SignIn setUser={setUser}/>} />
        <Route path="/signup" element = {<SignUp setUser={setUser}/>} /> 
        <Route path="/main" element = {<Main user={user}/>} />  
        <Route path="/qna" element = {<QnA user={user}/>} />
        <Route path="/database" element = {<DataBase user={user}/>} />
        <Route path="/mypage" element = {<MyPage user={user}/>} />   
        <Route path="/search" element = {<Search user={user}/>} />
      </Routes>
    );
}

export default function Root() {
  return (
    <Router>
      <App/>
    </Router>
  )
};
