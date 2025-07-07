import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../styles/AdminRegister.css'
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
    const navigate =useNavigate()
  const [error, setError] = useState('');
  const [register, setRegister] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/createAdmin', register);
      console.log("Admin created:", response.data);
      setError('');
      navigate('/adminlogin')
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={register.email}
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={register.password}
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/adminlogin">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminRegister;
