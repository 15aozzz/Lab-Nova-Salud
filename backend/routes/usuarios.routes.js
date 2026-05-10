const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

// GET /api/usuarios?busqueda=xxx
router.get('/', async (req, res) => {
    const { busqueda = '' } = req.query;
    try {
        const [result] = await db.query('CALL sp_get_todos_usuarios(?)', [busqueda]);
        res.json(result[0]);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/usuarios/buscar?username=xxx
router.get('/buscar', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'El parámetro "username" es requerido' });
    try {
        const [rows] = await db.query('CALL sp_buscar_usuario(?)', [username]);
        if (rows[0].length > 0) {
            res.json({ encontrado: true, ...rows[0][0] });
        } else {
            res.json({ encontrado: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/usuarios
router.post('/', async (req, res) => {
    const { username, password, id_empleado } = req.body;
    if (!username || !password || !id_empleado) {
        return res.status(400).json({ error: 'Username, password y empleado son obligatorios' });
    }
    try {
        const password_hash = crypto.createHash('sha256').update(password).digest('hex');
        const [result] = await db.query('CALL sp_crear_usuario(?, ?, ?)', [
            username, password_hash, id_empleado
        ]);
        res.status(201).json({ 
            id_usuario: result[0][0].id_usuario, 
            message: 'Usuario creado exitosamente' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, id_empleado } = req.body;
    if (!username || !id_empleado) {
        return res.status(400).json({ error: 'Username y empleado son obligatorios' });
    }
    try {
        // Si se proporciona password, lo hasheamos; si no, mantenemos el actual (sp tendría que manejar eso)
        // Para simplificar, asumimos que siempre se envía password (en edición se puede reenviar la misma)
        let password_hash = null;
        if (password) {
            password_hash = crypto.createHash('sha256').update(password).digest('hex');
        } else {
            // Obtener hash actual
            const [rows] = await db.query('CALL sp_buscar_usuario(?)', [username]);
            if (rows[0].length > 0) {
                password_hash = rows[0][0].password_hash;
            } else {
                return res.status(404).json({ error: 'Usuario no encontrado para obtener hash actual' });
            }
        }
        await db.query('CALL sp_actualizar_usuario(?, ?, ?, ?)', [
            id, username, password_hash, id_empleado
        ]);
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/usuarios/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('CALL sp_eliminar_usuario(?)', [id]);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/usuarios/empleados - Lista de empleados para asignar
router.get('/empleados', async (req, res) => {
    try {
        const [result] = await db.query('CALL sp_get_empleados()');
        res.json(result[0]);
    } catch (error) {
        console.error('Error obteniendo empleados:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
