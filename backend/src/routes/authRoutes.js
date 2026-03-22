const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController');
const db = require('../config/db');

router.post('/registro', registro);
router.post('/login', login);

router.post('/hacer-admin', async (req, res) => {
  try {
    const { email } = req.body;
    const [result] = await db.execute("UPDATE usuarios SET rol = 'admin' WHERE email = ?", [email]);
    res.json({ mensaje: 'Rol actualizado a admin', filas: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;