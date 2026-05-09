# Backend Botica Nova Salud

Backend desarrollado con Node.js y Express para la gestión de ventas de una farmacia. Utiliza una arquitectura basada estrictamente en Stored Procedures.

## Requisitos

- Node.js (v14 o superior)
- MySQL Server
- Base de Datos `BoticaNovaSalud_Final` creada (usar script SQL adjunto)

## Instalación

1. Clonar el repositorio o copiar la carpeta `backend`.
2. Abrir una terminal en la carpeta `backend`.
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Configurar las variables de entorno:
   - Copiar `.env.example` a `.env`.
   - Ajustar las credenciales de tu base de datos MySQL.

## Ejecución

Para iniciar el servidor:
```bash
npm start
```

El servidor correrá por defecto en `http://localhost:3000`.

## Endpoints Principales

- **Comprobantes**:
  - `GET /api/comprobantes/tipos`
  - `GET /api/comprobantes/serie/:id_tipo`
- **Clientes**:
  - `GET /api/clientes/buscar?doc=...`
- **Productos**:
  - `GET /api/productos/buscar?q=...`
  - `GET /api/productos/:id/precios`
- **Ventas**:
  - `POST /api/ventas/registrar`
  - `GET /api/ventas/:id`

## Estructura del Proyecto

```
backend/
├── routes/             # Definición de endpoints
├── db.js               # Configuración de pool de conexiones
├── index.js            # Punto de entrada de la aplicación
├── .env                # Variables de entorno
└── package.json        # Dependencias y scripts
```
