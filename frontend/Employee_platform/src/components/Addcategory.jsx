import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Addcategory.css';

const Addcategory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_name: ""
  });

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await axios.post('http://localhost:5000/createcategory', form);
      setMsg('Employee category added successfully');
      setForm({ category_name: "" });
      navigate('/adminDashboard/category');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      if (err.response?.status === 401) navigate('/adminlogin');
    }
  };

  return (
    <div className="add-category-wrapper">
      <form className="category-form" onSubmit={handleSubmit}>
        <h2>Add New Category</h2>

        <label>
          Category Name
          <input
            type="text"
            name="category_name"
            value={form.category_name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
          />
        </label>

        {msg && <p className="success-msg">{msg}</p>}
        {error && <p className="error-msg">{error}</p>}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Addcategory;
