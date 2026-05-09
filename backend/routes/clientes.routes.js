const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/clientes?busqueda=xxx
router.get('/', async (req, res) => {
    const { busqueda = '' } = req.query;
    try {
        const [result] = await db.query('CALL sp_get_todos_clientes(?)', [busqueda]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/clientes/buscar?doc=12345678
router.get('/buscar', async (req, res) => {
    const { doc } = req.query;
    if (!doc) return res.status(400).json({ error: 'El parámetro "doc" es requerido' });
    try {
        const [rows] = await db.query('CALL sp_buscar_cliente(?)', [doc]);
        if (rows[0].length > 0) {
            res.json({ encontrado: true, ...rows[0][0] });
        } else {
            res.json({ encontrado: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/clientes
router.post('/', async (req, res) => {
    const { numero_documento, nombres_razon_social } = req.body;
    if (!numero_documento || !nombres_razon_social) {
        return res.status(400).json({ error: 'Número de documento y nombre son obligatorios' });
    }
    try {
        const [result] = await db.query('CALL sp_crear_cliente(?, ?)', [numero_documento, nombres_razon_social]);
        res.status(201).json({ id_cliente: result[0][0].id_cliente, message: 'Cliente creado exitosamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un cliente con ese número de documento' });
        }
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/clientes/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { numero_documento, nombres_razon_social } = req.body;
    if (!numero_documento || !nombres_razon_social) {
        return res.status(400).json({ error: 'Número de documento y nombre son obligatorios' });
    }
    try {
        await db.query('CALL sp_actualizar_cliente(?, ?, ?)', [id, numero_documento, nombres_razon_social]);
        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
