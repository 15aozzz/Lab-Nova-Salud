const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const comprobantesRoutes = require('./routes/comprobantes.routes');
const clientesRoutes = require('./routes/clientes.routes');
const productosRoutes = require('./routes/productos.routes');
const ventasRoutes = require('./routes/ventas.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/comprobantes', comprobantesRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend Nova Salud funcionando correctamente' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor', detail: err.message });
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en: http://localhost:${PORT}`);
    console.log(` API Base URL: http://localhost:${PORT}/api`);
});
