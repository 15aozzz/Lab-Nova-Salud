# 🏥 Botica Nova Salud — Sistema de Ventas

Sistema web de gestión de ventas para farmacia. Permite registrar boletas/facturas, gestionar productos, clientes y usuarios, con un dashboard de resumen de actividad.

---

## 📋 Tabla de Contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Endpoints del backend](#endpoints-del-backend)
- [Páginas del frontend](#páginas-del-frontend)
- [Usuario de prueba](#usuario-de-prueba)
- [Notas importantes](#notas-importantes)

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS v4 |
| **Backend** | Node.js + Express 5 |
| **Base de datos** | MySQL (Stored Procedures + Triggers) |
| **Autenticación** | JWT (`jsonwebtoken`) + SHA-256 |
| **HTTP Client** | Axios |
| **Gráficos** | Recharts |
| **Iconos** | Lucide React |

---

## Estructura del proyecto

```
Lab-Nova-Salud/
├── boticanovasalud_final.sql     ← Base de datos completa (tablas + SPs + triggers + datos)
│
├── backend/
│   ├── index.js                  ← Servidor Express principal
│   ├── db.js                     ← Pool de conexiones MySQL2
│   ├── .env.example              ← Plantilla de variables de entorno
│   ├── middleware/
│   │   └── auth.js               ← Middleware de autenticación JWT
│   └── routes/
│       ├── auth.routes.js        ← POST /api/auth/login
│       ├── comprobantes.routes.js
│       ├── clientes.routes.js
│       ├── productos.routes.js
│       ├── ventas.routes.js
│       ├── dashboard.routes.js
│       └── usuarios.routes.js
│
└── fn/                           ← Frontend (React + Vite)
    └── src/
        ├── api/client.js         ← Instancia Axios configurada
        ├── services/api.js       ← Todos los servicios del frontend
        ├── context/AuthContext.jsx
        ├── router/ProtectedRoute.jsx
        ├── components/
        │   ├── Layout/
        │   ├── Navbar/
        │   └── Sidebar/
        └── pages/
            ├── Login/
            ├── Dashboard/
            ├── NuevaVenta/       ← Página de boleta/venta
            ├── Comprobantes/
            ├── Productos/
            ├── Clientes/
            └── Usuarios/
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [MySQL](https://dev.mysql.com/downloads/) v8.0 o superior
- MySQL Workbench (recomendado para ejecutar el SQL)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/15aozzz/Lab-Nova-Salud.git
cd Lab-Nova-Salud
```

### 2. Configurar la base de datos

Abre MySQL Workbench y ejecuta el archivo completo:

```
boticanovasalud_final.sql
```

Esto crea la base de datos `BoticaNovaSalud_Final` con:
- Todas las tablas
- Datos maestros (categorías, presentaciones, laboratorios, etc.)
- Productos y precios de prueba
- Empleados y usuarios de prueba
- Stored Procedures (SPs)
- Triggers de validación y descuento de stock

### 3. Configurar y arrancar el Backend

```bash
cd backend
npm install
```

Crea el archivo `.env` (cópialo desde `.env.example`):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_de_mysql
DB_NAME=BoticaNovaSalud_Final
PORT=3000
JWT_SECRET=cambia_esto_por_una_clave_segura
```

Arranca el servidor:

```bash
npm start
```

Verifica que funciona en: `http://localhost:3000/api/health`

### 4. Configurar y arrancar el Frontend

```bash
cd fn
npm install
```

Crea el archivo `.env` en la carpeta `fn/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Arranca el servidor de desarrollo:

```bash
npm run dev
```

Abre el navegador en: `http://localhost:5173`

---

## Endpoints del backend

Todos los endpoints llaman Stored Procedures internamente. El backend no ejecuta queries SQL directas.

| Método | Endpoint | SP que llama | Descripción |
|--------|----------|-------------|-------------|
| `POST` | `/api/auth/login` | `sp_login` | Autenticación, retorna JWT |
| `GET` | `/api/comprobantes/tipos` | `sp_get_tipos_comprobante` | Lista BOLETA, FACTURA, etc. |
| `GET` | `/api/comprobantes/serie/:id` | `sp_get_serie_correlativo` | Serie y próximo correlativo |
| `GET` | `/api/clientes/buscar?doc=` | `sp_buscar_cliente` | Busca cliente por documento |
| `GET` | `/api/productos/buscar?q=` | `sp_buscar_productos` | Busca productos con sus precios |
| `GET` | `/api/productos/:id/precios` | `sp_get_precios_producto` | Precios disponibles de un producto |
| `POST` | `/api/ventas/registrar` | `sp_registrar_venta` | Registra venta completa |
| `GET` | `/api/ventas/:id` | `sp_get_venta_detalle` | Detalle de una venta |
| `GET` | `/api/dashboard/resumen` | Varios SPs | KPIs, gráficos, alertas |
| `GET` | `/api/usuarios` | — | Lista usuarios |
| `POST` | `/api/usuarios` | — | Crea usuario |

### Ejemplo: Registrar una venta

`POST /api/ventas/registrar`

```json
{
  "id_tipo_comprobante": 1,
  "numero_documento_cliente": "12345678",
  "nombres_razon_social": "Juan Pérez",
  "id_usuario": 2,
  "total": 5.00,
  "detalle": [
    {
      "id_producto": 1,
      "id_producto_precio": 1,
      "cantidad": 10,
      "precio_unitario": 0.50,
      "subtotal": 5.00
    }
  ]
}
```

Respuesta exitosa:
```json
{
  "exito": true,
  "id_venta": 1,
  "serie": "B001",
  "numero_documento": "00000001",
  "total": 5.00
}
```

---

## Páginas del frontend

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Login | Autenticación con usuario y contraseña |
| `/dashboard` | Dashboard | KPIs de ventas, gráfico semanal, alertas de stock bajo |
| `/nueva-venta` | Nueva Venta | Registro de boleta/factura con búsqueda de productos |
| `/comprobantes` | Comprobantes | Historial y búsqueda de ventas realizadas |
| `/productos` | Productos | CRUD de productos e inventario |
| `/clientes` | Clientes | CRUD de clientes |
| `/usuarios` | Usuarios | Gestión de usuarios del sistema |

Todas las rutas excepto `/` están protegidas con `ProtectedRoute` que valida el JWT en localStorage.

---

## Usuario de prueba

Después de ejecutar el SQL, puedes ingresar con:

| Usuario | Contraseña | Cargo |
|---------|-----------|-------|
| `admin` | `admin123` | Administrador |
| `cajero1` | `admin123` | Cajero |

---

## Cómo funciona el stock

El sistema usa **triggers en MySQL** para gestionar el stock automáticamente:

- **`trg_validar_stock_antes_venta`** (BEFORE INSERT en `Detalle_Ventas`): verifica que haya stock suficiente. Si no alcanza, lanza un error y cancela toda la transacción.
- **`trg_reducir_stock_post_venta`** (AFTER INSERT en `Detalle_Ventas`): descuenta el stock considerando la equivalencia de unidades.

```
Ejemplo: vender 2 blísteres x10 de Paracetamol
→ descuenta 2 × 10 = 20 unidades del stock_actual_unidades
```

---

## Notas importantes

> ℹ️ El backend usa `multipleStatements: true` en el pool de MySQL2 para poder leer los múltiples result sets que retornan algunos Stored Procedures.

---

## Curso

Proyecto desarrollado para el curso **FullStack**.
