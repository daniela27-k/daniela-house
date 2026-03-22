const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController');

router.post('/registro', registro);
router.post('/login', login);
router.post('/hacer-admin', async (req, res) => {
  const db = require('../config/db');
  const { email } = req.body;
  await db.query("UPDATE usuarios SET rol = 'admin' WHERE email = ?", [email]);
  res.json({ mensaje: 'Rol actualizado a admin' });
});

module.exports = router;