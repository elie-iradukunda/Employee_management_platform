import React from 'react'

const Addcategory = () => {


  const [form, setForm] = useState({
    category_name:""
  
  })

   const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

    
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await axios.post('http://localhost:5000/createcategory', form);
      setMsg('Employee category added succesfly');
      setForm({
       category_name:""
      });
    
      navigate('/adminDashboard/employeesList')
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      if (err.response?.status === 401) navigate('/adminlogin');
    }
  };
  return (
   <>
   <div>
    <div className='addcategory'>

  <form className="emp-form" onSubmit={handleSubmit}>
        <label>
          Category name
          <input name="fullname" value={form.category_name} onChange={handleChange} required />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
   </div>
   </>
  )
}

export default Addcategory
