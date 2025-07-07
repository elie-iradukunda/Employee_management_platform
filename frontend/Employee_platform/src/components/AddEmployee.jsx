import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/addEmployee.css';          

const AddEmployee = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    location: '',
    phone: '',
    employeecategory: '',
    salary: '',
    date_of_birth: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    axios.get('http://localhost:5000/allcategory')   
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await axios.post('http://localhost:5000/createemployee', form);
      setMsg('Employee added successfully');
      setForm({
        fullname: '',
        email: '',
        location: '',
        phone: '',
        employeecategory: '',
        salary: '',
        date_of_birth: ''
      });
    
      navigate('/adminDashboard/employeesList')
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      if (err.response?.status === 401) navigate('/adminlogin');
    }
  };

  return (
    <div className="outline-container">
      <header className="header-section">
        <h1>Add Employee</h1>
        {error && <p className="error">{error}</p>}
        {msg && <p className="success">{msg}</p>}
      </header>

      <form className="emp-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="fullname" value={form.fullname} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} />
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>

        <label>
          Category
          <select
            name="employeecategory"
            value={form.employeecategory}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Salary
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            step="0.01"
          />
        </label>

        <label>
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEmployee;
