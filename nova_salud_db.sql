-- ======================================================
-- BOTICA NOVA SALUD - SQL COMPLETO
-- Incluye: Datos maestros, datos de prueba, SPs, Triggers
-- El backend SOLO llama SPs, nunca queries directas
-- ======================================================

USE BoticaNovaSalud_Final;

-- ======================================================
-- SECCIÓN 1: DATOS MAESTROS (poblar catálogos)
-- ======================================================

INSERT INTO Cargos (nombre_cargo) VALUES 
('Administrador'),
('Cajero'),
('Farmacéutico'),
('Almacenero');

INSERT INTO Categorias (nombre_categoria) VALUES 
('Analgésicos'),
('Antibióticos'),
('Vitaminas y Suplementos'),
('Antiinflamatorios'),
('Antiácidos'),
('Antialérgicos'),
('Antihipertensivos'),
('Uso Externo');

INSERT INTO Presentaciones (nombre_presentacion) VALUES 
('Tableta'),
('Cápsula'),
('Jarabe'),
('Inyectable'),
('Crema'),
('Gel'),
('Gotas'),
('Supositorio'),
('Parche');

INSERT INTO Unidades_Medida (nombre_unidad) VALUES 
('Unidad'),
('Blíster x10'),
('Blíster x12'),
('Caja x100'),
('Frasco'),
('Ampolla');

INSERT INTO Tipos_Comprobantes (nombre_documento, serie_actual, correlativo_actual) VALUES 
('BOLETA',   'B001', 0),
('FACTURA',  'F001', 0),
('TICKET',   'T001', 0),
('NOTA VENTA','NV01', 0);

INSERT INTO Laboratorios (nombre_laboratorio, estado) VALUES 
('Bayer',        TRUE),
('MK',           TRUE),
('Medifarma',    TRUE),
('Genfar',       TRUE),
('Farmindustria',TRUE),
('Teva',         TRUE),
('Abbott',       TRUE),
('Pfizer',       TRUE);


-- ======================================================
-- SECCIÓN 2: DATOS DE PRUEBA (empleados, usuarios, productos)
-- ======================================================

-- Empleados
INSERT INTO Empleados (dni, nombres, apellidos, id_cargo) VALUES 
('12345678', 'Carlos',  'Mendoza Ríos',    1),  -- Administrador
('87654321', 'Lucía',   'Torres Vargas',   2),  -- Cajero
('11223344', 'Roberto', 'Quispe Huanca',   3),  -- Farmacéutico
('44332211', 'Ana',     'Flores Díaz',     2);  -- Cajero

-- Usuarios
INSERT INTO Usuarios (username, password_hash, id_empleado) VALUES
('admin', '$2b$10$examplehashADMIN123placeholder000001', 1),
('cajero1','$2b$10$examplehashCAJERO1placeholder00001', 2),
('cajero2','$2b$10$examplehashCAJERO2placeholder00001', 4);

-- Clientes de prueba
INSERT INTO Clientes (numero_documento, nombres_razon_social) VALUES 
('00000000000', 'CLIENTE GENÉRICO'),
('12345678901', 'Juan Carlos Pérez López'),
('98765432101', 'María Elena Rodríguez'),
('20512345678', 'FARMACIA SAN JUAN S.A.C.');

-- Productos
INSERT INTO Productos (id_laboratorio, id_categoria, id_presentacion, nombre_comercial, principio_activo, stock_actual_unidades, stock_minimo_unidades) VALUES
(3, 1, 1, 'Paracetamol 500mg',         'Paracetamol',           200, 20),
(3, 1, 1, 'Ibuprofeno 400mg',           'Ibuprofeno',            150, 20),
(4, 2, 2, 'Amoxicilina 500mg',          'Amoxicilina',           100, 10),
(1, 4, 1, 'Diclofenaco 50mg',           'Diclofenaco Sódico',    120, 15),
(3, 5, 3, 'Omeprazol 20mg Jarabe',      'Omeprazol',              80, 10),
(3, 3, 2, 'Vitamina C 1000mg',          'Ácido Ascórbico',       300, 30),
(3, 1, 3, 'NiñoFebril Jarabe 120ml',    'Paracetamol Pediátrico', 60, 10),
(4, 6, 1, 'Loratadina 10mg',            'Loratadina',            180, 20),
(5, 7, 1, 'Enalapril 10mg',             'Enalapril Maleato',     250, 25),
(3, 8, 5, 'Betametasona Crema 15g',     'Betametasona',           45, 5),
(2, 2, 2, 'Azitromicina 500mg',         'Azitromicina',           70, 10),
(1, 4, 4, 'Diclofenaco Inyectable 75mg','Diclofenaco Sódico',     30, 5);

-- Precios por unidad de medida (cada producto puede tener varios precios)
-- Paracetamol 500mg (id=1)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(1, 1, 1,   0.50),   -- Unidad: S/ 0.50 (equivale a 1 tableta)
(1, 2, 10,  4.50),   -- Blíster x10: S/ 4.50 (equivale a 10 tabletas)
(1, 4, 100, 40.00);  -- Caja x100: S/ 40.00

-- Ibuprofeno 400mg (id=2)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(2, 1, 1,  0.60),
(2, 2, 10, 5.50),
(2, 4, 100,50.00);

-- Amoxicilina 500mg (id=3)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(3, 1, 1,  1.20),
(3, 3, 12, 13.00);  -- Blíster x12

-- Diclofenaco 50mg (id=4)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(4, 1, 1,  0.40),
(4, 2, 10, 3.50);

-- Omeprazol Jarabe (id=5)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(5, 5, 1, 18.50);  -- Frasco completo

-- Vitamina C 1000mg (id=6)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(6, 1, 1,  1.00),
(6, 2, 10, 9.00),
(6, 4, 100,85.00);

-- NiñoFebril Jarabe (id=7)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(7, 5, 1, 12.90);  -- Frasco

-- Loratadina 10mg (id=8)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(8, 1, 1,  0.80),
(8, 2, 10, 7.00);

-- Enalapril 10mg (id=9)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(9, 1, 1,  0.35),
(9, 2, 10, 3.00),
(9, 4, 100,28.00);

-- Betametasona Crema (id=10)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(10, 5, 1, 9.50);  -- Tubo/Frasco

-- Azitromicina 500mg (id=11)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(11, 1, 1, 3.50),
(11, 3, 3, 9.90);  -- Blíster x3 (tratamiento completo)

-- Diclofenaco Inyectable (id=12)
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(12, 6, 1,  2.50),  -- Ampolla
(12, 5, 10, 22.00); -- Caja de 10 ampollas


-- ======================================================
-- SECCIÓN 3: TRIGGERS
-- ======================================================

-- -----------------------------------------------------
-- TRIGGER 1: Validar stock ANTES de insertar detalle
-- Si no hay suficiente stock, lanza error y cancela todo
-- -----------------------------------------------------
DELIMITER $$
CREATE TRIGGER trg_validar_stock_antes_venta
BEFORE INSERT ON Detalle_Ventas
FOR EACH ROW
BEGIN
    DECLARE v_stock_actual     INT;
    DECLARE v_cant_equivalente INT;
    DECLARE v_stock_descontar  INT;
    DECLARE v_nombre_producto  VARCHAR(100);

    -- Obtiene stock actual y nombre del producto
    SELECT p.stock_actual_unidades, p.nombre_comercial
    INTO v_stock_actual, v_nombre_producto
    FROM Productos p
    WHERE p.id_producto = NEW.id_producto;

    -- Obtiene cuántas unidades base equivale la presentación vendida
    SELECT pp.cantidad_equivalente
    INTO v_cant_equivalente
    FROM Productos_Precios pp
    WHERE pp.id_producto_precio = NEW.id_producto_precio;

    -- Total de unidades base a descontar
    SET v_stock_descontar = NEW.cantidad * v_cant_equivalente;

    -- Si no alcanza el stock, lanza error y aborta
    IF v_stock_descontar > v_stock_actual THEN
        SET @msg = CONCAT('Stock insuficiente para: ', v_nombre_producto, '. Stock disponible: ', v_stock_actual, ' unidades. Se requieren: ', v_stock_descontar, ' unidades.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @msg;
    END IF;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- TRIGGER 2: Reducir stock DESPUÉS de insertar detalle
-- Se dispara automáticamente luego de registrar la venta
-- El SP no necesita hacer UPDATE de stock manualmente
-- -----------------------------------------------------
DELIMITER $$
CREATE TRIGGER trg_reducir_stock_post_venta
AFTER INSERT ON Detalle_Ventas
FOR EACH ROW
BEGIN
    DECLARE v_cant_equivalente INT;

    -- Obtiene factor de conversión de la presentación vendida
    SELECT pp.cantidad_equivalente
    INTO v_cant_equivalente
    FROM Productos_Precios pp
    WHERE pp.id_producto_precio = NEW.id_producto_precio;

    -- Descuenta del stock (cantidad vendida × unidades que equivale)
    UPDATE Productos
    SET stock_actual_unidades = stock_actual_unidades - (NEW.cantidad * v_cant_equivalente)
    WHERE id_producto = NEW.id_producto;
END$$
DELIMITER ;


-- ======================================================
-- SECCIÓN 4: STORED PROCEDURES
-- El backend SOLO llama estos SPs, nunca queries directas
-- ======================================================

-- -----------------------------------------------------
-- SP 1: Obtener todos los tipos de comprobante
-- Endpoint: GET /api/comprobantes/tipos
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_get_tipos_comprobante()
BEGIN
    SELECT 
        id_tipo_comprobante,
        nombre_documento,
        serie_actual,
        correlativo_actual
    FROM Tipos_Comprobantes
    ORDER BY id_tipo_comprobante;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 2: Obtener serie y correlativo siguiente para un tipo
-- Endpoint: GET /api/comprobantes/serie/:id_tipo
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_get_serie_correlativo(
    IN p_id_tipo INT
)
BEGIN
    SELECT 
        serie_actual              AS serie,
        (correlativo_actual + 1)  AS proximo_correlativo,
        LPAD(correlativo_actual + 1, 8, '0') AS numero_documento_preview
    FROM Tipos_Comprobantes
    WHERE id_tipo_comprobante = p_id_tipo;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 3: Buscar cliente por número de documento
-- Endpoint: GET /api/clientes/buscar?doc=XXXX
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_buscar_cliente(
    IN p_numero_documento VARCHAR(20)
)
BEGIN
    SELECT 
        id_cliente,
        numero_documento,
        nombres_razon_social
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;
    -- Si no retorna filas: el frontend muestra campos vacíos para llenar
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 4: Buscar productos por nombre o código
-- Endpoint: GET /api/productos/buscar?q=TEXTO
-- Retorna producto + TODOS sus precios disponibles
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_buscar_productos(
    IN p_texto VARCHAR(100)
)
BEGIN
    SELECT 
        p.id_producto,
        p.nombre_comercial,
        p.principio_activo,
        p.stock_actual_unidades,
        p.stock_minimo_unidades,
        pr.nombre_presentacion,
        l.nombre_laboratorio,
        pp.id_producto_precio,
        um.nombre_unidad,
        pp.cantidad_equivalente,
        pp.precio_venta
    FROM Productos p
    JOIN Presentaciones    pr ON p.id_presentacion    = pr.id_presentacion
    JOIN Laboratorios       l ON p.id_laboratorio      = l.id_laboratorio
    JOIN Productos_Precios pp ON pp.id_producto        = p.id_producto
    JOIN Unidades_Medida   um ON um.id_unit            = pp.id_unidad
    WHERE (
        p.nombre_comercial  LIKE CONCAT('%', p_texto, '%') OR
        p.principio_activo  LIKE CONCAT('%', p_texto, '%')
    )
    AND p.stock_actual_unidades > 0
    ORDER BY p.nombre_comercial, pp.precio_venta;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 5: Obtener precios de un producto específico
-- Endpoint: GET /api/productos/:id/precios
-- Se usa cuando el cajero selecciona un producto del listado
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_get_precios_producto(
    IN p_id_producto INT
)
BEGIN
    SELECT 
        pp.id_producto_precio,
        um.nombre_unidad,
        pp.cantidad_equivalente,
        pp.precio_venta,
        p.stock_actual_unidades,
        FLOOR(p.stock_actual_unidades / pp.cantidad_equivalente) AS stock_en_esta_unidad
    FROM Productos_Precios pp
    JOIN Unidades_Medida um ON um.id_unit      = pp.id_unidad
    JOIN Productos        p ON p.id_producto   = pp.id_producto
    WHERE pp.id_producto = p_id_producto
    ORDER BY pp.cantidad_equivalente;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 6: Buscar o crear cliente (usado al registrar venta)
-- Llamado internamente por sp_registrar_venta
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_buscar_o_crear_cliente(
    IN  p_numero_documento    VARCHAR(20),
    IN  p_nombres_razon_social VARCHAR(150),
    OUT p_id_cliente          INT
)
BEGIN
    -- Intenta encontrar cliente existente
    SELECT id_cliente INTO p_id_cliente
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;

    -- Si no existe, lo crea
    IF p_id_cliente IS NULL THEN
        INSERT INTO Clientes (numero_documento, nombres_razon_social)
        VALUES (p_numero_documento, p_nombres_razon_social);
        SET p_id_cliente = LAST_INSERT_ID();
    END IF;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 7: REGISTRAR VENTA COMPLETA ⭐ (el más importante)
-- Endpoint: POST /api/ventas/registrar
-- Recibe JSON con cabecera + detalle completo
-- Los triggers se encargan del stock automáticamente
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_registrar_venta(
    -- Datos del comprobante
    IN  p_id_tipo_comprobante   INT,
    -- Datos del cliente
    IN  p_numero_documento_cli  VARCHAR(20),
    IN  p_nombres_razon_social  VARCHAR(150),
    -- Datos del cajero
    IN  p_id_usuario            INT,
    -- Total de la venta
    IN  p_total                 DECIMAL(10,2),
    -- Detalle en JSON: [{"id_producto":1,"id_producto_precio":2,"cantidad":3,"precio_unitario":0.50,"subtotal":1.50}]
    IN  p_detalle_json          JSON,
    -- Valores de retorno
    OUT p_id_venta              INT,
    OUT p_serie                 CHAR(4),
    OUT p_numero_documento      VARCHAR(10),
    OUT p_mensaje               VARCHAR(200)
)
BEGIN
    DECLARE v_correlativo       INT;
    DECLARE v_serie             CHAR(4);
    DECLARE v_numero_doc        VARCHAR(10);
    DECLARE v_id_cliente        INT;
    DECLARE v_total_items       INT;
    DECLARE v_i                 INT DEFAULT 0;
    DECLARE v_id_producto       INT;
    DECLARE v_id_prod_precio    INT;
    DECLARE v_cantidad          INT;
    DECLARE v_precio_unit       DECIMAL(10,2);
    DECLARE v_subtotal          DECIMAL(10,2);

    -- Si algo falla: rollback completo y retorna el error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1 p_mensaje = MESSAGE_TEXT;
        SET p_id_venta = NULL;
    END;

    START TRANSACTION;

    -- PASO 1: Obtener correlativo y bloquearlo (FOR UPDATE evita duplicados)
    SELECT serie_actual, (correlativo_actual + 1)
    INTO v_serie, v_correlativo
    FROM Tipos_Comprobantes
    WHERE id_tipo_comprobante = p_id_tipo_comprobante
    FOR UPDATE;

    -- Incrementar correlativo en la tabla
    UPDATE Tipos_Comprobantes
    SET correlativo_actual = correlativo_actual + 1
    WHERE id_tipo_comprobante = p_id_tipo_comprobante;

    SET v_numero_doc = LPAD(v_correlativo, 8, '0');  -- ej: 00000001

    -- PASO 2: Buscar o crear cliente
    CALL sp_buscar_o_crear_cliente(
        p_numero_documento_cli,
        p_nombres_razon_social,
        v_id_cliente
    );

    -- PASO 3: Insertar cabecera de venta
    INSERT INTO Ventas (
        id_tipo_comprobante,
        serie_documento,
        numero_documento,
        id_cliente,
        id_usuario,
        total
    ) VALUES (
        p_id_tipo_comprobante,
        v_serie,
        v_numero_doc,
        v_id_cliente,
        p_id_usuario,
        p_total
    );
    SET p_id_venta = LAST_INSERT_ID();

    -- PASO 4: Insertar líneas del detalle (el TRIGGER reduce el stock automáticamente)
    SET v_total_items = JSON_LENGTH(p_detalle_json);

    WHILE v_i < v_total_items DO
        SET v_id_producto    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto')));
        SET v_id_prod_precio = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto_precio')));
        SET v_cantidad       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].cantidad')));
        SET v_precio_unit    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].precio_unitario')));
        SET v_subtotal       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].subtotal')));

        -- Al insertar aquí:
        --   → trg_validar_stock_antes_venta valida si hay stock
        --   → trg_reducir_stock_post_venta descuenta el stock
        INSERT INTO Detalle_Ventas (
            id_venta,
            id_producto,
            id_producto_precio,
            cantidad,
            precio_unitario,
            subtotal
        ) VALUES (
            p_id_venta,
            v_id_producto,
            v_id_prod_precio,
            v_cantidad,
            v_precio_unit,
            v_subtotal
        );

        SET v_i = v_i + 1;
    END WHILE;

    COMMIT;

    -- Retornar datos de la boleta generada
    SET p_serie            = v_serie;
    SET p_numero_documento = v_numero_doc;
    SET p_mensaje          = 'Venta registrada correctamente';

END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 8: Consultar una venta registrada (para imprimir)
-- Endpoint: GET /api/ventas/:id
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_get_venta_detalle(
    IN p_id_venta INT
)
BEGIN
    -- Cabecera de la venta
    SELECT 
        v.id_venta,
        tc.nombre_documento         AS tipo_comprobante,
        v.serie_documento,
        v.numero_documento,
        v.fecha_hora,
        v.total,
        c.numero_documento          AS doc_cliente,
        c.nombres_razon_social      AS cliente,
        CONCAT(e.nombres, ' ', e.apellidos) AS cajero
    FROM Ventas v
    JOIN Tipos_Comprobantes tc ON tc.id_tipo_comprobante = v.id_tipo_comprobante
    JOIN Clientes             c ON c.id_cliente           = v.id_cliente
    JOIN Usuarios             u ON u.id_usuario           = v.id_usuario
    JOIN Empleados            e ON e.id_empleado          = u.id_empleado
    WHERE v.id_venta = p_id_venta;

    -- Detalle de productos
    SELECT 
        p.nombre_comercial,
        um.nombre_unidad,
        dv.cantidad,
        dv.precio_unitario,
        dv.subtotal
    FROM Detalle_Ventas dv
    JOIN Productos        p  ON p.id_producto         = dv.id_producto
    JOIN Productos_Precios pp ON pp.id_producto_precio = dv.id_producto_precio
    JOIN Unidades_Medida   um ON um.id_unit             = pp.id_unidad
    WHERE dv.id_venta = p_id_venta;
END$$
DELIMITER ;


-- -----------------------------------------------------
-- SP 10: Obtener todos los empleados (con cargo)
-- Endpoint: GET /api/usuarios/empleados
-- -----------------------------------------------------
DELIMITER $$
CREATE PROCEDURE sp_get_empleados()
BEGIN
    SELECT 
        e.id_empleado,
        e.dni,
        e.nombres,
        e.apellidos,
        c.nombre_cargo,
        CASE WHEN u.id_usuario IS NOT NULL THEN TRUE ELSE FALSE END AS tiene_usuario
    FROM Empleados e
    INNER JOIN Cargos c ON c.id_cargo = e.id_cargo
    LEFT JOIN Usuarios u ON u.id_empleado = e.id_empleado
    ORDER BY e.nombres, e.apellidos;
END$$
DELIMITER ;


-- ======================================================
-- RESUMEN DE SPs Y ENDPOINTS DEL BACKEND
-- ======================================================
/*
╔══════════════════════════════════════════════════════════════╗
║            MAPA COMPLETO: ENDPOINT → SP                      ║
╠══════════════════════════════════════════════════════════════╣
║ GET  /api/comprobantes/tipos          → sp_get_tipos_comprobante()          ║
║ GET  /api/comprobantes/serie/:id      → sp_get_serie_correlativo(id)        ║
║ GET  /api/clientes/buscar?doc=XXX     → sp_buscar_cliente(doc)              ║
║ GET  /api/productos/buscar?q=TEXTO    → sp_buscar_productos(texto)          ║
║ GET  /api/productos/:id/precios       → sp_get_precios_producto(id)         ║
║ POST /api/ventas/registrar            → sp_registrar_venta(...)             ║
║ GET  /api/ventas/:id                  → sp_get_venta_detalle(id)            ║
╠══════════════════════════════════════════════════════════════╣
║            TRIGGERS ACTIVOS                                  ║
╠══════════════════════════════════════════════════════════════╣
║ trg_validar_stock_antes_venta   → BEFORE INSERT Detalle_Ventas              ║
║ trg_reducir_stock_post_venta    → AFTER INSERT Detalle_Ventas               ║
╚══════════════════════════════════════════════════════════════╝
*/
