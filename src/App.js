import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Question from './pages/Question';
import DataBase from './pages/Database';
import MyPage from './pages/MyPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<SignIn/>} />
        <Route path="/signup" element = {<SignUp/>} /> 
        <Route path="/main" element = {<Main/>} />  
        <Route path="/qna" element = {<Question/>} />
        <Route path="/database" element = {<DataBase />} />
        <Route path="/mypage" element ={<MyPage/>} />   
      </Routes>
    </Router>
    );
}

export default App;
