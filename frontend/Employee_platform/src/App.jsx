// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminRegister from './components/AdminRegister';
import AdminLogin    from './components/AdminLogin';
import Dashboard     from './components/Dashboard';
      import EmployeeCategory from './components/EmployeeCategory'
      import Adminprofile from './components/Adminprofile'
      import EmployeeList from './components/EmployeeList'
      import Logout from './components/Logout'

const App = () => (
  <BrowserRouter>
    <Routes>
     
      <Route path="/"element={<Navigate to="/adminlogin" />} />
      <Route path="/adminregister" element={<AdminRegister />} />
      <Route path="/adminlogin"    element={<AdminLogin />} />

      <Route path="/adminDashboard"  element={<Dashboard />} />
      <Route path="/adminDashboard/employeesList"element={<EmployeeList />} />
      <Route path="/adminDashboard/category" element={<EmployeeCategory />} />
      <Route path="/adminDashboard/profile" element={<Adminprofile />} />

      <Route path="/logout" element={<Logout />} />
      
    
      <Route path="*" element={<h2 style={{textAlign:'center'}}>404 – Page not found</h2>} />
    </Routes>
  </BrowserRouter>
);

export default App;
