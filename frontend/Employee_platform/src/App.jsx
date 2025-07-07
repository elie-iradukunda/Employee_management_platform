import React, { useState } from 'react';

import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/adminregister' element={<AdminRegister />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminDashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
