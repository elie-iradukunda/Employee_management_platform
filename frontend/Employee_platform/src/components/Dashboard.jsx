import React from 'react';
import Navbars from './Navbars';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Navbars />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
