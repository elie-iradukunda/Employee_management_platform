// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminRegister     from './components/AdminRegister';
import AdminLogin        from './components/AdminLogin';
import Dashboard         from './components/Dashboard';
import EmployeeCategory  from './components/EmployeeCategory';
import Adminprofile      from './components/Adminprofile';
import EmployeeList      from './components/EmployeeList';
import Logout            from './components/Logout';
import AddEmployee from './components/AddEmployee';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/adminlogin" />} />
      <Route path="/adminregister" element={<AdminRegister />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route path="/adminDashboard" element={<Dashboard />}>
        <Route index element={<EmployeeList />} />
        <Route path="employeesList" element={<EmployeeList />} />
        <Route path="category" element={<EmployeeCategory />} />
        <Route path="profile" element={<Adminprofile />} />
         <Route path="addemployee" element={<AddEmployee />} />
      </Route>

      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 – Page not found</h2>} />
    </Routes>
  </BrowserRouter>
);

export default App;
