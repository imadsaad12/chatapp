import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Views/Home/index"
import Login from "./Views/Login/index"
import Signup from "./Views/Signup/index"
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
