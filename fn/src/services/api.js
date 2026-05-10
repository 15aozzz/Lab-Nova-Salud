import client from '../api/client';

export const authService = {
  login: (username, password) => 
    client.post('/auth/login', { username, password })
};

export const comprobantesService = {
  getAll: (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.fecha_inicio) params.append('fecha_inicio', filtros.fecha_inicio);
    if (filtros.fecha_fin) params.append('fecha_fin', filtros.fecha_fin);
    if (filtros.tipo && filtros.tipo !== 'TODOS') params.append('tipo', filtros.tipo);
    if (filtros.busqueda) params.append('busqueda', filtros.busqueda);
    const query = params.toString();
    return client.get(`/comprobantes${query ? '?' + query : ''}`);
  },
  getTipos: () => client.get('/comprobantes/tipos'),
  getSerie: (id) => client.get(`/comprobantes/serie/${id}`)
};

export const clientesService = {
  getAll: (busqueda = '') => client.get(`/clientes?busqueda=${busqueda}`),
  buscar: (doc) => client.get(`/clientes/buscar?doc=${doc}`),
  crear: (data) => client.post('/clientes', data),
  actualizar: (id, data) => client.put(`/clientes/${id}`, data)
};

export const productosService = {
  getAll: () => client.get('/productos'),
  buscar: (q) => client.get(`/productos/buscar?q=${q}`),
  getPrecios: (id) => client.get(`/productos/${id}/precios`),
  crear: (data) => client.post('/productos', data),
  actualizar: (id, data) => client.put(`/productos/${id}`, data)
};

export const ventasService = {
  registrar: (data) => client.post('/ventas/registrar', data),
  getVenta: (id) => client.get(`/ventas/${id}`)
};

export const dashboardService = {
  getResumen: () => client.get('/dashboard/resumen')
};

export const usuariosService = {
  getAll: (busqueda = '') => client.get(`/usuarios?busqueda=${busqueda}`),
  buscar: (username) => client.get(`/usuarios/buscar?username=${username}`),
  getEmpleados: () => client.get('/usuarios/empleados'),
  crear: (data) => client.post('/usuarios', data),
  actualizar: (id, data) => client.put(`/usuarios/${id}`, data),
  eliminar: (id) => client.delete(`/usuarios/${id}`)
};