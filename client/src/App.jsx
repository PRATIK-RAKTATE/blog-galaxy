import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import ThreeD from './pages/ThreeD'
import ShipBlogs from './pages/ShipBlogs'
import CreateBlog from './pages/CreateBlog'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/explore' element={<ThreeD/>} />
        <Route path='/ship-blogs' element={<ShipBlogs/>} />
        <Route path='/register' element={<Login/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/create' element={<CreateBlog/>} />
      </Routes>
    </div>
  )
}

export default App
