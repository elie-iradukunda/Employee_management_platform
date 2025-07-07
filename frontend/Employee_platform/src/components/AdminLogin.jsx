import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css'

const AdminLogin = () => {
  const navigate = useNavigate();

  const [logins, setLogins] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.get('http://localhost:5000/admins', logins);
      console.log("User logged in:", response.data);

      setError('');
      navigate('/adminDashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={logins.email}
            onChange={(e) => setLogins({ ...logins, email: e.target.value })}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={logins.password}
            onChange={(e) => setLogins({ ...logins, password: e.target.value })}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/adminregister">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
