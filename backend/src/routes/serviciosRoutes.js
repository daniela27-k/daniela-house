const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM servicios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

module.exports = router;