const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/productos
router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('CALL sp_get_todos_productos()');
        const rows = result[0];

        // Agrupar por id_producto (ya que un producto puede tener múltiples precios)
        const productosAgrupados = rows.reduce((acc, current) => {
            const { id_producto_precio, unidad, abreviatura, precio_venta, factor, ...prodInfo } = current;
            
            let producto = acc.find(p => p.id_producto === prodInfo.id_producto);
            
            if (!producto) {
                producto = {
                    ...prodInfo,
                    precios: []
                };
                acc.push(producto);
            }
            
            if (id_producto_precio) {
                producto.precios.push({
                    id_producto_precio,
                    unidad,
                    abreviatura,
                    precio_venta,
                    factor
                });
            }
            
            return acc;
        }, []);

        res.json(productosAgrupados);
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/productos/buscar?q=paracetamol
router.get('/buscar', async (req, res) => {
    const { q } = req.query;

    if (!q || q.length < 2) {
        return res.status(400).json({ error: 'El parámetro "q" debe tener al menos 2 caracteres' });
    }

    try {
        const [rows] = await db.query('CALL sp_buscar_productos(?)', [q]);
        const results = rows[0];

        // Agrupar por id_producto
        const productosAgrupados = results.reduce((acc, current) => {
            const { id_producto, nombre_comercial, principio_activo, stock_actual_unidades, nombre_presentacion, nombre_laboratorio, ...precioInfo } = current;
            
            let producto = acc.find(p => p.id_producto === id_producto);
            
            if (!producto) {
                producto = {
                    id_producto,
                    nombre_comercial,
                    principio_activo,
                    stock_actual_unidades,
                    nombre_presentacion,
                    nombre_laboratorio,
                    precios: []
                };
                acc.push(producto);
            }
            
            producto.precios.push({
                id_producto_precio: precioInfo.id_producto_precio,
                nombre_unidad: precioInfo.nombre_unidad,
                cantidad_equivalente: precioInfo.cantidad_equivalente,
                precio_venta: precioInfo.precio_venta
            });
            
            return acc;
        }, []);

        res.json(productosAgrupados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/productos/:id/precios
router.get('/:id/precios', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('CALL sp_get_precios_producto(?)', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/productos
router.post('/', async (req, res) => {
    const { nombre_comercial, principio_activo, laboratorio, categoria, presentacion, stock_inicial, stock_minimo, precios } = req.body;

    if (!nombre_comercial || !laboratorio || !categoria || !precios?.length) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // Crear producto
        await conn.query('CALL sp_crear_producto(?, ?, ?, ?, ?, ?, ?, @id_out)', [
            nombre_comercial, principio_activo || '', laboratorio, categoria,
            presentacion || '', stock_inicial || 0, stock_minimo || 0
        ]);
        const [[{ 'id_out': id_producto }]] = await conn.query('SELECT @id_out as id_out');

        // Insertar precios
        for (const precio of precios) {
            await conn.query('CALL sp_agregar_precio_producto(?, ?, ?, ?)', [
                id_producto, precio.nombre_unidad, precio.factor, precio.precio_venta
            ]);
        }

        await conn.commit();
        res.status(201).json({ id_producto, message: 'Producto creado exitosamente' });
    } catch (error) {
        await conn.rollback();
        console.error('Error creando producto:', error);
        res.status(500).json({ error: error.message });
    } finally {
        conn.release();
    }
});

// PUT /api/productos/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_comercial, stock_actual, stock_minimo, categoria } = req.body;

    if (!nombre_comercial || !categoria) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        await db.query('CALL sp_actualizar_producto(?, ?, ?, ?, ?)', [
            id, nombre_comercial, stock_actual || 0, stock_minimo || 0, categoria
        ]);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
