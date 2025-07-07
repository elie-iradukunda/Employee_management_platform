import React from 'react';
import '../styles/pages.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
const EmployeeCategory = () => {


    const [category, setEmpcategory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpcategory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/allcategory');
        setEmpcategory(res.data);
        setError('');
      } catch (err) {
        const msg = err.response?.data?.message || 'Something went wrong';
        setError(msg);
        if (err.response?.status === 401) navigate('/adminlogin');
      }
    };

    fetchEmpcategory();
  }, [navigate]);
  return (
    <div className="outline-container">
       <header className="header-section">
        <h1>Employee categories</h1>
        <p>This is all employees category</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

           <section className="content-section">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Category name</th>
             
            </tr>
          </thead>
          <tbody>
            {category.map((e, i) => (
              <tr key={e.id || i}>
                <td>{i + 1}</td>
                <td>{e.category_name}</td>
               
              </tr>
            ))}
          </tbody>
        </table>

         <div className='add'>
      <Link to="/adminDashboard/addemployeecategory"><button>Add category</button></Link>
      </div>
      </section>

      
    </div>
  );
};

export default EmployeeCategory;
