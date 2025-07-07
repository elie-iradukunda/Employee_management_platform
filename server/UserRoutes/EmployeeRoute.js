import express from 'express';
import pool from '../utilis/db.js';

const router2 = express.Router();

router2.post('/createemployee', async (req, res) => {
  const {
    fullname,
    email,
    location,
    phone,
    employeecategory,
    salary,
    date_of_birth
  } = req.body;

  try {
    const duplicate = await pool.query(
      'SELECT * FROM employees WHERE email = $1 OR phone = $2',
      [email, phone]
    );
    if (duplicate.rowCount) return res.status(409).json({ message: 'Employee already exists' });

    const result = await pool.query(
      `INSERT INTO employees
       (fullname, email, location, phone, employeecategory, salary, date_of_birth)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [fullname, email, location, phone, employeecategory, salary, date_of_birth]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



router2.get('/allemployees', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, c.category_name
      FROM employees e
      JOIN empcategory c ON e.employeecategory = c.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router2.get('/allcategory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empcategory');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






router2.post('/createcategory', async (req, res) => {
  const { category_name } = req.body;

  try {
    const existing = await pool.query(
      'SELECT *FROM empcategory WHERE category_name = $1',
      [category_name]
    );

    if (existing.rowCount > 0) {
      return res.status(409).json({ message: 'This category already exists' });
    }

    const newCategory = await pool.query(
      'INSERT INTO empcategory (category_name) VALUES ($1) RETURNING *',
      [category_name]
    );

    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router2.delete('/deleteemployee/:id',async(req,res)=>{
    const {id}=req.params
try {
    const sql=await pool.query('DELETE FROM employees where id=$1',[id])
     res.status(201).json({
      message: 'employees successfully deleted',
      deletedemployee: sql.rows[0]
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
})


router2.put('/updateemployee/:id', async (req, res) => {
  const { fullname, email, location, phone, employeecategory, salary } = req.body;
  const { id } = req.params;

  try {
   
    const checking = await pool.query(
      'SELECT * FROM employees WHERE (phone = $1 OR email = $2) AND id != $3',
      [phone, email, id]
    );

    if (checking.rowCount > 0) {
     return res.status(409).json({ message: 'check email or phone duplication!!😂👌' });
    }

    
    const updateQuery = `
      UPDATE employees
      SET fullname = $1, email = $2, location = $3, phone = $4, employeecategory = $5, salary = $6
      WHERE id = $7
      RETURNING *;
    `;

    const updated = await pool.query(updateQuery, [
      fullname, email, location, phone, employeecategory, salary, id
    ]);

    res.status(200).json({ message: 'Employee updated successfully', data: updated.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router2;
