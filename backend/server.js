const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const serviciosRoutes = require('./src/routes/serviciosRoutes');
app.use('/api/servicios', serviciosRoutes);
app.use('/api/auth', authRoutes);
const citasRoutes = require('./src/routes/citasRoutes');
app.use('/api/citas', citasRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Daniela House API funcionando ✅' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});