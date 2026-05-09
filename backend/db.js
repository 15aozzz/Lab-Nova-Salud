const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BoticaNovaSalud_Final',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Permite múltiples result sets para SPs como sp_get_venta_detalle
    multipleStatements: true 
});

// Probar conexión
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión a la base de datos establecida correctamente');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error conectando a la base de datos:', err.message);
    });

module.exports = pool;
