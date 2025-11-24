// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage'; 
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import ForgotPasswordPage from './pages/forgotPasswordPage';
import VerifyCodePage from './pages/verifyCodePage';
import ResetPasswordPage from './pages/resetPasswordPage';


function App() {
  return (
    <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/register' element = {<RegisterPage />} />

          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/verify-code' element={<VerifyCodePage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
    </Routes>
      
  );
}

export default App;  