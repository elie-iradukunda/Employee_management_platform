import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbars.css';

const Navbars = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-links">
        <Link to="/adminDashboard">Dashboard</Link>
        <Link to="/adminDashboard/employeesList">Manage Employees</Link>
        <Link to="/adminDashboard/category">Category</Link>
        <Link to="/adminDashboard/profile">Profile</Link>
        <Link to="/adminlogin">Logout</Link>
      </nav>
    </div>
  );
};

export default Navbars;
