import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element ={<Login/>} />
        <Route path="/signup" element = {<SignUp/>} />      
      </Routes>
    </Router>
    );
}

export default App;
