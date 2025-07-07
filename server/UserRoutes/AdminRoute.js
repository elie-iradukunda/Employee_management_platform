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



router.post('/admins', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admin WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, admin: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
