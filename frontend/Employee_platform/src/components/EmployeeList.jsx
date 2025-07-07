import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/employeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleEdit = (employee) => {
  navigate('/adminDashboard/updateemployee', { state: { employee } });
};


  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/allemployees');
      setEmployees(res.data);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
      if (err.response?.status === 401) navigate('/adminlogin');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [navigate]);

  const deleteemployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteemployee/${id}`);
      
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <div className="outline-container">
      <header className="header-section">
        <h1>Employee list</h1>
        <p>This is all employees in our company</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <section className="content-section">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <tr key={e.id || i}>
                <td>{i + 1}</td>
                <td>{e.fullname}</td>
                <td>{e.email}</td>
                <td>{e.location}</td>
                <td>{e.phone}</td>
                <td>{e.category_name}</td>
                <td>{e.salary}</td>
                <td>
                  <button onClick={() => deleteemployee(e.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
                 <td>
                  
                  <button className="updatebtn" onClick={() => handleEdit(e)}>
  Update
</button>

                 
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="add">
        <Link to="/adminDashboard/addemployee">
          <button>Add employee</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
