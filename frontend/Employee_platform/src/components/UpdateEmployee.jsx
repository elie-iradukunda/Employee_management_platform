import React, { useState, useEffect } from 'react';
import '../styles/updateemployee.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { state } = useLocation();
  const navigate   = useNavigate();

  const [categories, setCategories] = useState([]);
  const [error, setError]= useState('');

  const [formData, setFormData] = useState({
    id: '',
    fullname: '',
    email: '',
    location: '',
    phone: '',
    employeecategory: '',   
    salary: ''
  });

  useEffect(() => {
    if (state?.employee) setFormData(state.employee);
  }, [state]);

 
  useEffect(() => {
    axios.get('http://localhost:5000/allcategory')
         .then(res => setCategories(res.data))  
         .catch(()  => setCategories([]));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      
      [name]: name === 'employeecategory' ? Number(value) : value
    });
  };


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/updateemployee/${formData.id}`,
        formData                            
      );
      navigate('/adminDashboard/employeesList');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="update-employee-card">
      <h1>Update employee</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" />
        <input name="email"    value={formData.email}    onChange={handleChange} placeholder="Email" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input name="phone"    value={formData.phone}    onChange={handleChange} placeholder="Phone" />

        <select
          name="employeecategory"             
          value={formData.employeecategory}
          onChange={handleChange}
        >
          <option value=""></option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.category_name}</option>
          ))}
        </select>

        <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
