const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [result] = await db.query('CALL sp_login(?)', [username]);
    const rows = result[0];
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    // Validar con SHA-256 (compatible con datosmock.js)
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (hash !== rows[0].password_hash) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: rows[0].id_usuario }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({
      token,
      usuario: {
        id: rows[0].id_usuario,
        nombre: `${rows[0].nombres} ${rows[0].apellidos}`,
        cargo: rows[0].nombre_cargo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;