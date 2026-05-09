const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/ventas/registrar
router.post('/registrar', async (req, res) => {
    const { 
        id_tipo_comprobante, 
        numero_documento_cliente, 
        nombres_razon_social, 
        id_usuario, 
        total, 
        detalle 
    } = req.body;

    // Validaciones
    if (!id_tipo_comprobante || typeof id_tipo_comprobante !== 'number') {
        return res.status(400).json({ error: 'id_tipo_comprobante es requerido y debe ser un número' });
    }
    if (!id_usuario || typeof id_usuario !== 'number') {
        return res.status(400).json({ error: 'id_usuario es requerido y debe ser un número' });
    }
    if (!total || total <= 0) {
        return res.status(400).json({ error: 'total es requerido y debe ser mayor a 0' });
    }
    if (!Array.isArray(detalle) || detalle.length === 0) {
        return res.status(400).json({ error: 'detalle debe ser un array con al menos 1 elemento' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Convertir detalle a JSON string
        const detalleJson = JSON.stringify(detalle);

        // 1. Llamar al SP con parámetros OUT usando variables de sesión
        await connection.query(
            'CALL sp_registrar_venta(?, ?, ?, ?, ?, ?, @id_venta, @serie, @numero_doc, @mensaje)',
            [id_tipo_comprobante, numero_documento_cliente, nombres_razon_social, id_usuario, total, detalleJson]
        );

        // 2. Leer las variables de sesión
        const [outParams] = await connection.query(
            'SELECT @id_venta AS id_venta, @serie AS serie, @numero_doc AS numero_doc, @mensaje AS mensaje'
        );
        const resultado = outParams[0];

        if (!resultado.id_venta) {
            await connection.rollback();
            return res.status(400).json({ exito: false, mensaje: resultado.mensaje });
        }

        await connection.commit();
        res.json({ 
            exito: true, 
            id_venta: resultado.id_venta, 
            serie: resultado.serie, 
            numero_documento: resultado.numero_doc, 
            total 
        });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
});

// GET /api/ventas/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // En db.js habilitamos multipleStatements: true
        const [results] = await db.query('CALL sp_get_venta_detalle(?)', [id]);
        
        // results[0] contiene la cabecera (primer SELECT)
        // results[1] contiene el detalle (segundo SELECT)
        
        if (results[0].length === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json({
            cabecera: results[0][0],
            detalle: results[1]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
