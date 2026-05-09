const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/resumen', async (req, res) => {
    try {
        const [kpisResult] = await db.query('CALL sp_dashboard_kpis()');
        const [ventasSemanaResult] = await db.query('CALL sp_dashboard_ventas_semana()');
        const [alertasResult] = await db.query('CALL sp_dashboard_alertas()');
        const [ultimosComprobantesResult] = await db.query('CALL sp_dashboard_ultimos_comprobantes()');

        res.json({
            kpis: kpisResult[0],
            ventasSemana: ventasSemanaResult[0],
            alertas: alertasResult[0],
            ultimosComprobantes: ultimosComprobantesResult[0]
        });
    } catch (error) {
        console.error('Error obteniendo resumen del dashboard:', error);
        res.status(500).json({ error: 'Error al obtener resumen del dashboard' });
    }
});

module.exports = router;
