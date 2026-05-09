const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/comprobantes/tipos
router.get('/tipos', async (req, res) => {
    try {
        const [rows] = await db.query('CALL sp_get_tipos_comprobante()');
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/comprobantes/serie/:id_tipo
router.get('/serie/:id_tipo', async (req, res) => {
    const { id_tipo } = req.params;
    try {
        const [rows] = await db.query('CALL sp_get_serie_correlativo(?)', [id_tipo]);
        if (rows[0].length === 0) {
            return res.status(404).json({ error: 'Tipo de comprobante no encontrado' });
        }
        res.json(rows[0][0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
