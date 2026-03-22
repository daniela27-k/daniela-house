const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');

// Mis citas (cliente) - debe ir ANTES de la ruta '/'
router.get('/mis-citas', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, s.nombre as nombre_servicio,
             c.fecha, c.hora, c.estado
      FROM citas c
      JOIN servicios s ON c.servicio_id = s.id
      WHERE c.usuario_id = ?
      ORDER BY c.fecha ASC, c.hora ASC
    `, [req.usuario.id])
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' })
  }
})

// Obtener todas las citas (admin)
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, u.nombre as nombre_usuario, s.nombre as nombre_servicio,
             c.fecha, c.hora, c.estado
      FROM citas c
      JOIN usuarios u ON c.usuario_id = u.id
      JOIN servicios s ON c.servicio_id = s.id
      ORDER BY c.fecha ASC, c.hora ASC
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' })
  }
})

// Crear cita
router.post('/', auth, async (req, res) => {
  const { servicio_id, fecha, hora } = req.body
  try {
    await db.query(
      'INSERT INTO citas (usuario_id, servicio_id, fecha, hora) VALUES (?, ?, ?, ?)',
      [req.usuario.id, servicio_id, fecha, hora]
    )
    res.json({ mensaje: 'Cita agendada ✅' })
  } catch (error) {
    res.status(500).json({ error: 'Error al agendar cita' })
  }
})

// Actualizar estado de cita
router.put('/:id', auth, async (req, res) => {
  const { estado } = req.body
  try {
    await db.query('UPDATE citas SET estado = ? WHERE id = ?', [estado, req.params.id])
    res.json({ mensaje: 'Estado actualizado ✅' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cita' })
  }
})

module.exports = router;