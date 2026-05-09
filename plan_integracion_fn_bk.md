# Plan de Integración: Frontend (fn) ↔ Backend (bk)

## 1. Validación de la Base de Datos
He revisado el archivo `nova_salud_db.sql` y el esquema general del proyecto. **Es totalmente correcto que existan exactamente 13 tablas**. Estas corresponden a la estructura normalizada necesaria para que el sistema funcione correctamente con los Procedimientos Almacenados (SPs) y Triggers.

Las 13 tablas son:
1. `Cargos`
2. `Categorias`
3. `Presentaciones`
4. `Unidades_Medida`
5. `Tipos_Comprobantes`
6. `Laboratorios`
7. `Empleados`
8. `Usuarios`
9. `Clientes`
10. `Productos`
11. `Productos_Precios`
12. `Ventas`
13. `Detalle_Ventas`

No te preocupes por la cantidad, la base de datos está completa y lista para ser consumida.

---

## 2. Plan para Conectar el Frontend con el Backend

### Paso 1: Configurar el Backend (bk)
1. **Archivo de Entorno**: Asegurarnos de que exista un archivo `.env` en la carpeta `backend` basado en `.env.example`.
2. **Base de Datos**: Validar que MySQL esté corriendo en el puerto 3306 y que el pool de conexiones en `backend/db.js` logre conectarse (`✅ Conexión a la base de datos establecida correctamente`).
3. **Servidor Express**: Ejecutar el backend (`node index.js`) y verificar que los endpoints bajo `/api/...` respondan correctamente (especialmente la ruta de prueba `GET /api/health`).

### Paso 2: Configurar el Cliente HTTP en el Frontend (fn)
1. **Variable de Entorno Base**: Crear un archivo `.env` en la raíz de la carpeta `fn` que contenga la URL del backend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
2. **Servicio Base (Axios/Fetch)**: Crear o modificar un archivo `src/api/client.js` (o similar) para configurar una instancia base que apunte automáticamente a `import.meta.env.VITE_API_URL`.

### Paso 3: Integración de los Módulos (Reemplazo de Mocks)
Debemos mapear las acciones de la interfaz (fn) directamente a los endpoints del backend que ya están diseñados y enrutados (`backend/index.js`):

- **Módulo de Comprobantes**:
  - `GET /api/comprobantes/tipos` -> Poblar el select de tipo de documento (Boleta, Factura, etc.).
  - `GET /api/comprobantes/serie/:id_tipo` -> Obtener la serie y el correlativo siguiente (ej. B001-00000001).

- **Módulo de Clientes**:
  - `GET /api/clientes/buscar?doc=XXXX` -> Al escribir un DNI/RUC en la venta, autocompletar el nombre si el cliente ya existe.

- **Módulo de Productos (Búsqueda y Carrito)**:
  - `GET /api/productos/buscar?q=TEXTO` -> Llenar la tabla de resultados de búsqueda de productos mostrando stock y opciones de precios.
  - `GET /api/productos/:id/precios` -> Al seleccionar un producto, mostrar sus posibles formas de venta (Unidad, Blister, Caja, etc.) con sus precios reales.

- **Módulo de Ventas (El flujo Core)**:
  - `POST /api/ventas/registrar` -> Al hacer clic en "VENDER", enviar un JSON estructurado con la cabecera (cliente, usuario, total) y el arreglo de detalles.
  - El Backend ejecutará `sp_registrar_venta`, el cual actualizará el stock mediante los *Triggers* `trg_validar_stock_antes_venta` y `trg_reducir_stock_post_venta`.
  - `GET /api/ventas/:id` -> Para poder imprimir el voucher/boleta post-venta.

### Paso 4: Pruebas End-to-End
1. Iniciar el frontend: `npm run dev` (puerto 5173 por defecto).
2. Iniciar el backend: `node index.js` (puerto 3000 por defecto).
3. Realizar un flujo de prueba completo: 
   - Buscar un producto
   - Agregarlo al carrito seleccionando su unidad de medida
   - Seleccionar un tipo de comprobante y llenar cliente
   - Confirmar venta y verificar que el stock en la BDD se haya reducido correctamente.
