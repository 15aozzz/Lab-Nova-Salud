/**
 * DATOS DE DEMOSTRACIÓN — NO USAR EN PRODUCCIÓN
 *
 * Las contraseñas se almacenan como hashes SHA-256 (nunca en texto plano).
 * Para generar el hash de una contraseña nueva, ejecutar en la consola del navegador:
 *
 *   const hash = async (txt) => {
 *     const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
 *     return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
 *   };
 *   hash('mi_contraseña').then(console.log);
 *
 * Credenciales actuales (¡cambiar antes de ir a producción!):
 *   admin    / admin123
 *   alopez   / ana123
 *   psanchez / pedro123
 */
const usuarios = [
  {
    id_usuario: 1,
    username: "admin",
    passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
    nombres: "Carlos",
    apellidos: "Mendoza Rivera",
    cargo: "Administrador"
  },
  {
    id_usuario: 2,
    username: "alopez",
    passwordHash: "11c2bbfc85b5977c499001d7d37ef4c2dc0e0c8eb1e2ebf73c6e0aaa64c48564",
    nombres: "Ana María",
    apellidos: "López García",
    cargo: "Farmacéutico"
  },
  {
    id_usuario: 3,
    username: "psanchez",
    passwordHash: "cd0c6fe3d1c36b6e06e4e6b49d773e82b7d8adf29e0e27c2d78be4ffe36c0a7a",
    nombres: "Pedro",
    apellidos: "Sánchez Torres",
    cargo: "Cajero"
  }
];


export const loginMock = async (username, password) => {
    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) return null;
    
    // Hash simple para demo: password123 -> hash conocido
    const validHashes = {
        'admin': '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
        'alopez': '11c2bbfc85b5977c499001d7d37ef4c2dc0e0c8eb1e2ebf73c6e0aaa64c48564',
        'psanchez': 'cd0c6fe3d1c36b6e06e4e6b49d773e82b7d8adf29e0e27c2d78be4ffe36c0a7a'
    };
    
    // Password de demo: admin123, ana123, pedro123
    const passwordHash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(password)
    );
    const hashHex = Array.from(new Uint8Array(passwordHash))
        .map(b => b.toString(16).padStart(2, '0')).join('');
    
    if (hashHex !== validHashes[username]) return null;
    
    return {
        token: 'mock-token-' + usuario.id_usuario,
        usuario: {
            id: usuario.id_usuario,
            nombre: `${usuario.nombres} ${usuario.apellidos}`,
            cargo: usuario.cargo
        }
    };
};

export default usuarios;