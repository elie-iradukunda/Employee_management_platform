import express from 'express';
import pool from '../utilis/db.js';

const router = express.Router();

router.post('/createAdmin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

    if (existing.rowCount > 0) {
      return res.status(409).json({ message: "User with this email already exists" }); 
    }

    const newAdmin = await pool.query(
      'INSERT INTO admin(email, password) VALUES($1, $2) RETURNING *',
      [email, password]
    );

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/admins', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admin');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
