-- =====================================================
-- Script: boticanovasalud_schema.sql
-- Descripcion: Estructura completa de la BD
--              boticanovasalud_final (VACIA, sin datos)
--              Solo incluye SPs usados por el backend
-- Motor: MariaDB 10.4.32
-- =====================================================

CREATE DATABASE IF NOT EXISTS `boticanovasalud_nueva`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE `boticanovasalud_nueva`;

-- =====================================================
-- TABLAS
-- =====================================================

-- 1. Cargos
CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Categorias
CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Clientes
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `numero_documento` char(11) NOT NULL,
  `nombres_razon_social` varchar(150) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `numero_documento` (`numero_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Presentaciones
CREATE TABLE `presentaciones` (
  `id_presentacion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_presentacion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_presentacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. Laboratorios
CREATE TABLE `laboratorios` (
  `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_laboratorio` varchar(100) NOT NULL,
  `contacto_proveedor` varchar(100) DEFAULT NULL,
  `telefono_contacto` varchar(15) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_laboratorio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. Unidades de Medida
CREATE TABLE `unidades_medida` (
  `id_unit` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_unidad` varchar(50) NOT NULL,
  PRIMARY KEY (`id_unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. Tipos de Comprobantes
CREATE TABLE `tipos_comprobantes` (
  `id_tipo_comprobante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_documento` varchar(20) NOT NULL,
  `serie_actual` char(4) NOT NULL,
  `correlativo_actual` int(11) DEFAULT 0,
  PRIMARY KEY (`id_tipo_comprobante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. Empleados
CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `dni` char(8) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `id_cargo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  UNIQUE KEY `dni` (`dni`),
  KEY `id_cargo` (`id_cargo`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 9. Productos
CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `id_laboratorio` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_presentacion` int(11) DEFAULT NULL,
  `nombre_comercial` varchar(100) NOT NULL,
  `principio_activo` varchar(100) DEFAULT NULL,
  `stock_actual_unidades` int(11) NOT NULL DEFAULT 0,
  `stock_minimo_unidades` int(11) NOT NULL DEFAULT 20,
  `fecha_vencimiento` date DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_laboratorio` (`id_laboratorio`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_presentacion` (`id_presentacion`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorios` (`id_laboratorio`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`),
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_presentacion`) REFERENCES `presentaciones` (`id_presentacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 10. Productos Precios
CREATE TABLE `productos_precios` (
  `id_producto_precio` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `id_unidad` int(11) DEFAULT NULL,
  `cantidad_equivalente` int(11) NOT NULL,
  `precio_venta` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_producto_precio`),
  KEY `id_producto` (`id_producto`),
  KEY `id_unidad` (`id_unidad`),
  CONSTRAINT `productos_precios_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `productos_precios_ibfk_2` FOREIGN KEY (`id_unidad`) REFERENCES `unidades_medida` (`id_unit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 11. Usuarios
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 12. Ventas
CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_comprobante` int(11) DEFAULT NULL,
  `serie_documento` char(4) DEFAULT NULL,
  `numero_documento` varchar(10) DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_cliente` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_tipo_comprobante` (`id_tipo_comprobante`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_tipo_comprobante`) REFERENCES `tipos_comprobantes` (`id_tipo_comprobante`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 13. Detalle Ventas
CREATE TABLE `detalle_ventas` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_producto_precio` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_venta` (`id_venta`),
  KEY `id_producto` (`id_producto`),
  KEY `id_producto_precio` (`id_producto_precio`),
  CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `detalle_ventas_ibfk_3` FOREIGN KEY (`id_producto_precio`) REFERENCES `productos_precios` (`id_producto_precio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =====================================================
-- TRIGGERS
-- =====================================================

DROP TRIGGER IF EXISTS `trg_validar_stock_antes_venta`;
DELIMITER ;;
CREATE TRIGGER `trg_validar_stock_antes_venta`
BEFORE INSERT ON `detalle_ventas`
FOR EACH ROW
BEGIN
    DECLARE v_stock_actual     INT;
    DECLARE v_cant_equivalente INT;
    DECLARE v_stock_descontar  INT;
    DECLARE v_nombre_producto  VARCHAR(100);

    SELECT p.stock_actual_unidades, p.nombre_comercial
    INTO v_stock_actual, v_nombre_producto
    FROM Productos p
    WHERE p.id_producto = NEW.id_producto;

    SELECT pp.cantidad_equivalente
    INTO v_cant_equivalente
    FROM Productos_Precios pp
    WHERE pp.id_producto_precio = NEW.id_producto_precio;

    SET v_stock_descontar = NEW.cantidad * v_cant_equivalente;

    IF v_stock_descontar > v_stock_actual THEN
        SET @msg = CONCAT('Stock insuficiente para: ', v_nombre_producto, '. Stock disponible: ', v_stock_actual, ' unidades. Se requieren: ', v_stock_descontar, ' unidades.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @msg;
    END IF;
END ;;
DELIMITER ;

DROP TRIGGER IF EXISTS `trg_reducir_stock_post_venta`;
DELIMITER ;;
CREATE TRIGGER `trg_reducir_stock_post_venta`
AFTER INSERT ON `detalle_ventas`
FOR EACH ROW
BEGIN
    DECLARE v_cant_equivalente INT;

    SELECT pp.cantidad_equivalente
    INTO v_cant_equivalente
    FROM Productos_Precios pp
    WHERE pp.id_producto_precio = NEW.id_producto_precio;

    UPDATE Productos
    SET stock_actual_unidades = stock_actual_unidades - (NEW.cantidad * v_cant_equivalente)
    WHERE id_producto = NEW.id_producto;
END ;;
DELIMITER ;

-- =====================================================
-- PROCEDIMIENTOS ALMACENADOS (solo los usados por backend)
-- =====================================================

-- sp_actualizar_cliente
DROP PROCEDURE IF EXISTS `sp_actualizar_cliente`;
DELIMITER ;;
CREATE PROCEDURE `sp_actualizar_cliente`(
    IN p_id_cliente INT,
    IN p_numero_documento CHAR(11),
    IN p_nombres_razon_social VARCHAR(150)
)
BEGIN
    UPDATE Clientes
    SET numero_documento = p_numero_documento,
        nombres_razon_social = p_nombres_razon_social
    WHERE id_cliente = p_id_cliente;
END ;;
DELIMITER ;

-- sp_actualizar_producto_completo
DROP PROCEDURE IF EXISTS `sp_actualizar_producto_completo`;
DELIMITER ;;
CREATE PROCEDURE `sp_actualizar_producto_completo`(
    IN _id_producto INT,
    IN _nombre_comercial VARCHAR(150),
    IN _principio_activo VARCHAR(150),
    IN _id_laboratorio INT,
    IN _id_categoria INT,
    IN _id_presentacion INT,
    IN _stock_actual INT,
    IN _stock_minimo INT,
    IN _fecha_vencimiento DATE,
    OUT _mensaje VARCHAR(200)
)
BEGIN
    UPDATE Productos
    SET nombre_comercial = _nombre_comercial,
        principio_activo = _principio_activo,
        id_laboratorio = _id_laboratorio,
        id_categoria = _id_categoria,
        id_presentacion = _id_presentacion,
        stock_actual_unidades = _stock_actual,
        stock_minimo_unidades = _stock_minimo,
        fecha_vencimiento = _fecha_vencimiento
    WHERE id_producto = _id_producto;

    SET _mensaje = 'Producto actualizado correctamente';
END ;;
DELIMITER ;

-- sp_actualizar_usuario
DROP PROCEDURE IF EXISTS `sp_actualizar_usuario`;
DELIMITER ;;
CREATE PROCEDURE `sp_actualizar_usuario`(
    IN p_id_usuario INT,
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_id_empleado INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM Usuarios WHERE username = p_username AND id_usuario <> p_id_usuario) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe otro usuario con ese username';
    END IF;

    IF EXISTS (SELECT 1 FROM Usuarios WHERE id_empleado = p_id_empleado AND id_usuario <> p_id_usuario) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este empleado ya tiene otro usuario registrado';
    END IF;

    UPDATE Usuarios
    SET username = p_username,
        password_hash = p_password_hash,
        id_empleado = p_id_empleado
    WHERE id_usuario = p_id_usuario;
END ;;
DELIMITER ;

-- sp_agregar_precio_producto
DROP PROCEDURE IF EXISTS `sp_agregar_precio_producto`;
DELIMITER ;;
CREATE PROCEDURE `sp_agregar_precio_producto`(
    IN p_id_producto INT,
    IN p_nombre_unidad VARCHAR(50),
    IN p_cantidad_equivalente INT,
    IN p_precio_venta DECIMAL(10,2)
)
BEGIN
    DECLARE v_id_unidad INT;

    SELECT id_unit INTO v_id_unidad FROM Unidades_Medida WHERE nombre_unidad = p_nombre_unidad LIMIT 1;

    IF v_id_unidad IS NOT NULL THEN
        INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta)
        VALUES (p_id_producto, v_id_unidad, p_cantidad_equivalente, p_precio_venta);
    END IF;
END ;;
DELIMITER ;

-- sp_buscar_cliente
DROP PROCEDURE IF EXISTS `sp_buscar_cliente`;
DELIMITER ;;
CREATE PROCEDURE `sp_buscar_cliente`(
    IN p_numero_documento VARCHAR(20)
)
BEGIN
    SELECT id_cliente, numero_documento, nombres_razon_social
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;
END ;;
DELIMITER ;

-- sp_buscar_o_crear_cliente
DROP PROCEDURE IF EXISTS `sp_buscar_o_crear_cliente`;
DELIMITER ;;
CREATE PROCEDURE `sp_buscar_o_crear_cliente`(
    IN  p_numero_documento    VARCHAR(20),
    IN  p_nombres_razon_social VARCHAR(150),
    OUT p_id_cliente          INT
)
BEGIN
    SELECT id_cliente INTO p_id_cliente
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;

    IF p_id_cliente IS NULL THEN
        INSERT INTO Clientes (numero_documento, nombres_razon_social)
        VALUES (p_numero_documento, p_nombres_razon_social);
        SET p_id_cliente = LAST_INSERT_ID();
    END IF;
END ;;
DELIMITER ;

-- sp_buscar_productos
DROP PROCEDURE IF EXISTS `sp_buscar_productos`;
DELIMITER ;;
CREATE PROCEDURE `sp_buscar_productos`(
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
    JOIN Presentaciones pr ON p.id_presentacion = pr.id_presentacion
    JOIN Laboratorios l ON p.id_laboratorio = l.id_laboratorio
    JOIN Productos_Precios pp ON pp.id_producto = p.id_producto
    JOIN Unidades_Medida um ON um.id_unit = pp.id_unidad
    WHERE (
        p.nombre_comercial LIKE CONCAT('%', p_texto, '%') OR
        p.principio_activo LIKE CONCAT('%', p_texto, '%')
    )
    AND p.stock_actual_unidades > 0
    ORDER BY p.nombre_comercial, pp.precio_venta;
END ;;
DELIMITER ;

-- sp_buscar_usuario
DROP PROCEDURE IF EXISTS `sp_buscar_usuario`;
DELIMITER ;;
CREATE PROCEDURE `sp_buscar_usuario`(
    IN p_username VARCHAR(50)
)
BEGIN
    SELECT
        u.id_usuario,
        u.username,
        u.id_empleado,
        e.dni,
        e.nombres,
        e.apellidos,
        c.nombre_cargo
    FROM Usuarios u
    INNER JOIN Empleados e ON e.id_empleado = u.id_empleado
    INNER JOIN Cargos c ON c.id_cargo = e.id_cargo
    WHERE u.username = p_username
    LIMIT 1;
END ;;
DELIMITER ;

-- sp_crear_cliente
DROP PROCEDURE IF EXISTS `sp_crear_cliente`;
DELIMITER ;;
CREATE PROCEDURE `sp_crear_cliente`(
    IN p_numero_documento CHAR(11),
    IN p_nombres_razon_social VARCHAR(150)
)
BEGIN
    INSERT INTO Clientes (numero_documento, nombres_razon_social)
    VALUES (p_numero_documento, p_nombres_razon_social);
    SELECT LAST_INSERT_ID() AS id_cliente;
END ;;
DELIMITER ;

-- sp_crear_producto
DROP PROCEDURE IF EXISTS `sp_crear_producto`;
DELIMITER ;;
CREATE PROCEDURE `sp_crear_producto`(
    IN p_nombre_comercial VARCHAR(150),
    IN p_principio_activo VARCHAR(150),
    IN p_laboratorio VARCHAR(100),
    IN p_categoria VARCHAR(50),
    IN p_presentacion VARCHAR(50),
    IN p_stock_inicial INT,
    IN p_stock_minimo INT,
    OUT p_id_producto INT
)
BEGIN
    DECLARE v_id_lab INT;
    DECLARE v_id_cat INT;
    DECLARE v_id_pres INT;

    SELECT id_laboratorio INTO v_id_lab FROM Laboratorios WHERE nombre_laboratorio = p_laboratorio LIMIT 1;
    SELECT id_categoria INTO v_id_cat FROM Categorias WHERE nombre_categoria = p_categoria LIMIT 1;
    SELECT id_presentacion INTO v_id_pres FROM Presentaciones WHERE nombre_presentacion = p_presentacion LIMIT 1;

    INSERT INTO Productos (id_laboratorio, id_categoria, id_presentacion, nombre_comercial, principio_activo, stock_actual_unidades, stock_minimo_unidades)
    VALUES (v_id_lab, v_id_cat, v_id_pres, p_nombre_comercial, p_principio_activo, p_stock_inicial, p_stock_minimo);

    SET p_id_producto = LAST_INSERT_ID();
END ;;
DELIMITER ;

-- sp_crear_usuario
DROP PROCEDURE IF EXISTS `sp_crear_usuario`;
DELIMITER ;;
CREATE PROCEDURE `sp_crear_usuario`(
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_id_empleado INT
)
BEGIN
    DECLARE v_id_usuario INT;

    IF EXISTS (SELECT 1 FROM Usuarios WHERE username = p_username) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe un usuario con ese username';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Empleados WHERE id_empleado = p_id_empleado) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El empleado especificado no existe';
    END IF;

    IF EXISTS (SELECT 1 FROM Usuarios WHERE id_empleado = p_id_empleado) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este empleado ya tiene un usuario registrado';
    END IF;

    INSERT INTO Usuarios (username, password_hash, id_empleado)
    VALUES (p_username, p_password_hash, p_id_empleado);

    SET v_id_usuario = LAST_INSERT_ID();

    SELECT v_id_usuario AS id_usuario;
END ;;
DELIMITER ;

-- sp_dashboard_alertas
DROP PROCEDURE IF EXISTS `sp_dashboard_alertas`;
DELIMITER ;;
CREATE PROCEDURE `sp_dashboard_alertas`()
BEGIN
    SELECT
        id_producto as id,
        nombre_comercial as producto,
        CONCAT(stock_actual_unidades, ' / ', stock_minimo_unidades) as stock,
        'Crítico' as estado,
        'error' as tipo
    FROM Productos
    WHERE stock_actual_unidades <= stock_minimo_unidades
    LIMIT 10;
END ;;
DELIMITER ;

-- sp_dashboard_kpis
DROP PROCEDURE IF EXISTS `sp_dashboard_kpis`;
DELIMITER ;;
CREATE PROCEDURE `sp_dashboard_kpis`()
BEGIN
    DECLARE v_ventas_hoy DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_comprobantes_hoy INT DEFAULT 0;
    DECLARE v_stock_critico INT DEFAULT 0;
    DECLARE v_por_vencer INT DEFAULT 0;

    SELECT COALESCE(SUM(total), 0), COUNT(*)
    INTO v_ventas_hoy, v_comprobantes_hoy
    FROM Ventas
    WHERE DATE(fecha_hora) = CURDATE();

    SELECT COUNT(*)
    INTO v_stock_critico
    FROM Productos
    WHERE stock_actual_unidades <= stock_minimo_unidades;

    SET v_por_vencer = 0;

    SELECT
        v_ventas_hoy AS ventas_hoy,
        v_comprobantes_hoy AS comprobantes_hoy,
        v_stock_critico AS stock_critico,
        v_por_vencer AS por_vencer;
END ;;
DELIMITER ;

-- sp_dashboard_ultimos_comprobantes
DROP PROCEDURE IF EXISTS `sp_dashboard_ultimos_comprobantes`;
DELIMITER ;;
CREATE PROCEDURE `sp_dashboard_ultimos_comprobantes`()
BEGIN
    SELECT
        v.id_venta as id,
        v.fecha_hora as fecha,
        tc.nombre_documento as tipo,
        CONCAT(v.serie_documento, '-', v.numero_documento) as numero,
        c.nombres_razon_social as cliente,
        CONCAT(e.nombres, ' ', LEFT(e.apellidos, 1), '.') as vendedor,
        v.total
    FROM Ventas v
    JOIN Tipos_Comprobantes tc ON v.id_tipo_comprobante = tc.id_tipo_comprobante
    JOIN Clientes c ON v.id_cliente = c.id_cliente
    JOIN Usuarios u ON v.id_usuario = u.id_usuario
    JOIN Empleados e ON u.id_empleado = e.id_empleado
    ORDER BY v.fecha_hora DESC
    LIMIT 5;
END ;;
DELIMITER ;

-- sp_dashboard_ventas_semana
DROP PROCEDURE IF EXISTS `sp_dashboard_ventas_semana`;
DELIMITER ;;
CREATE PROCEDURE `sp_dashboard_ventas_semana`()
BEGIN
    SELECT
        DATE(fecha_hora) as fecha,
        COALESCE(SUM(total), 0) as total_ventas
    FROM Ventas
    WHERE fecha_hora >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(fecha_hora)
    ORDER BY fecha ASC;
END ;;
DELIMITER ;

-- sp_eliminar_usuario
DROP PROCEDURE IF EXISTS `sp_eliminar_usuario`;
DELIMITER ;;
CREATE PROCEDURE `sp_eliminar_usuario`(
    IN p_id_usuario INT
)
BEGIN
    IF p_id_usuario = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se puede eliminar el usuario administrador principal';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = p_id_usuario) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no encontrado';
    END IF;

    DELETE FROM Usuarios WHERE id_usuario = p_id_usuario;
END ;;
DELIMITER ;

-- sp_get_empleados
DROP PROCEDURE IF EXISTS `sp_get_empleados`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_empleados`()
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
END ;;
DELIMITER ;

-- sp_get_precios_producto
DROP PROCEDURE IF EXISTS `sp_get_precios_producto`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_precios_producto`(
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
    JOIN Unidades_Medida um ON um.id_unit = pp.id_unidad
    JOIN Productos p ON p.id_producto = pp.id_producto
    WHERE pp.id_producto = p_id_producto
    ORDER BY pp.cantidad_equivalente;
END ;;
DELIMITER ;

-- sp_get_serie_correlativo
DROP PROCEDURE IF EXISTS `sp_get_serie_correlativo`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_serie_correlativo`(
    IN p_id_tipo INT
)
BEGIN
    SELECT
        serie_actual              AS serie,
        (correlativo_actual + 1)  AS proximo_correlativo,
        LPAD(correlativo_actual + 1, 8, '0') AS numero_documento_preview
    FROM Tipos_Comprobantes
    WHERE id_tipo_comprobante = p_id_tipo;
END ;;
DELIMITER ;

-- sp_get_tipos_comprobante
DROP PROCEDURE IF EXISTS `sp_get_tipos_comprobante`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_tipos_comprobante`()
BEGIN
    SELECT
        id_tipo_comprobante,
        nombre_documento,
        serie_actual,
        correlativo_actual
    FROM Tipos_Comprobantes
    ORDER BY id_tipo_comprobante;
END ;;
DELIMITER ;

-- sp_get_todos_clientes
DROP PROCEDURE IF EXISTS `sp_get_todos_clientes`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_todos_clientes`(IN p_busqueda VARCHAR(100))
BEGIN
    SELECT id_cliente, numero_documento, nombres_razon_social
    FROM Clientes
    WHERE p_busqueda = ''
       OR numero_documento LIKE CONCAT('%', p_busqueda, '%')
       OR nombres_razon_social LIKE CONCAT('%', p_busqueda, '%')
    ORDER BY nombres_razon_social;
END ;;
DELIMITER ;

-- sp_get_todos_productos
DROP PROCEDURE IF EXISTS `sp_get_todos_productos`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_todos_productos`()
BEGIN
    SELECT
        p.id_producto,
        LPAD(p.id_producto, 6, '0') AS codigo,
        p.nombre_comercial,
        p.principio_activo,
        p.stock_actual_unidades AS stock_actual,
        p.stock_minimo_unidades AS stock_minimo,
        pr.nombre_presentacion AS presentacion,
        l.nombre_laboratorio AS laboratorio,
        c.nombre_categoria AS categoria,
        CASE
            WHEN p.stock_actual_unidades <= 0 THEN 'AGOTADO'
            WHEN p.stock_actual_unidades <= p.stock_minimo_unidades THEN 'STOCK CRÍTICO'
            ELSE 'VIGENTE'
        END AS estado,
        pp.id_producto_precio,
        um.nombre_unidad,
        pp.cantidad_equivalente,
        pp.precio_venta
    FROM Productos p
    JOIN Presentaciones pr ON p.id_presentacion = pr.id_presentacion
    JOIN Laboratorios l ON p.id_laboratorio = l.id_laboratorio
    JOIN Categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN Productos_Precios pp ON pp.id_producto = p.id_producto
    LEFT JOIN Unidades_Medida um ON um.id_unit = pp.id_unidad
    ORDER BY p.nombre_comercial;
END ;;
DELIMITER ;

-- sp_get_todos_usuarios
DROP PROCEDURE IF EXISTS `sp_get_todos_usuarios`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_todos_usuarios`(
    IN p_busqueda VARCHAR(100)
)
BEGIN
    SELECT
        u.id_usuario,
        u.username,
        u.id_empleado,
        e.dni,
        e.nombres,
        e.apellidos,
        c.nombre_cargo,
        CASE
            WHEN u.username = 'admin' THEN TRUE
            ELSE FALSE
        END AS es_admin
    FROM Usuarios u
    INNER JOIN Empleados e ON e.id_empleado = u.id_empleado
    INNER JOIN Cargos c ON c.id_cargo = e.id_cargo
    WHERE (
        p_busqueda = ''
        OR u.username LIKE CONCAT('%', p_busqueda, '%')
        OR e.nombres LIKE CONCAT('%', p_busqueda, '%')
        OR e.apellidos LIKE CONCAT('%', p_busqueda, '%')
        OR e.dni LIKE CONCAT('%', p_busqueda, '%')
    )
    ORDER BY e.nombres, e.apellidos;
END ;;
DELIMITER ;

-- sp_get_venta_detalle
DROP PROCEDURE IF EXISTS `sp_get_venta_detalle`;
DELIMITER ;;
CREATE PROCEDURE `sp_get_venta_detalle`(
    IN p_id_venta INT
)
BEGIN
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
END ;;
DELIMITER ;

-- sp_listar_comprobantes
DROP PROCEDURE IF EXISTS `sp_listar_comprobantes`;
DELIMITER ;;
CREATE PROCEDURE `sp_listar_comprobantes`(
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE,
    IN p_tipo VARCHAR(30),
    IN p_busqueda VARCHAR(100)
)
BEGIN
    SET p_fecha_inicio = COALESCE(p_fecha_inicio, DATE_SUB(CURDATE(), INTERVAL 1 YEAR));
    SET p_fecha_fin = COALESCE(p_fecha_fin, CURDATE());
    SET p_tipo = COALESCE(p_tipo, '');
    SET p_busqueda = COALESCE(p_busqueda, '');

    SELECT
        v.id_venta,
        v.fecha_hora,
        tc.nombre_documento AS tipo_documento,
        v.serie_documento AS serie,
        v.numero_documento,
        c.nombres_razon_social AS cliente,
        CONCAT(e.nombres, ' ', e.apellidos) AS vendedor,
        v.total
    FROM Ventas v
    JOIN Tipos_Comprobantes tc ON tc.id_tipo_comprobante = v.id_tipo_comprobante
    JOIN Clientes c ON c.id_cliente = v.id_cliente
    JOIN Usuarios u ON u.id_usuario = v.id_usuario
    JOIN Empleados e ON e.id_empleado = u.id_empleado
    WHERE DATE(v.fecha_hora) BETWEEN p_fecha_inicio AND p_fecha_fin
      AND (p_tipo = '' OR tc.nombre_documento = p_tipo)
      AND (p_busqueda = ''
           OR c.nombres_razon_social LIKE CONCAT('%', p_busqueda, '%')
           OR v.numero_documento LIKE CONCAT('%', p_busqueda, '%')
           OR v.serie_documento LIKE CONCAT('%', p_busqueda, '%'))
    ORDER BY v.fecha_hora DESC;
END ;;
DELIMITER ;

-- sp_login
DROP PROCEDURE IF EXISTS `sp_login`;
DELIMITER ;;
CREATE PROCEDURE `sp_login`(
    IN p_username VARCHAR(50)
)
BEGIN
    SELECT
        u.id_usuario,
        u.username,
        u.password_hash,
        e.nombres,
        e.apellidos,
        c.nombre_cargo
    FROM Usuarios u
    JOIN Empleados e ON u.id_empleado = e.id_empleado
    JOIN Cargos c ON e.id_cargo = c.id_cargo
    WHERE u.username = p_username
    LIMIT 1;
END ;;
DELIMITER ;

-- sp_registrar_venta
DROP PROCEDURE IF EXISTS `sp_registrar_venta`;
DELIMITER ;;
CREATE PROCEDURE `sp_registrar_venta`(
    IN  p_id_tipo_comprobante   INT,
    IN  p_numero_documento_cli  VARCHAR(20),
    IN  p_nombres_razon_social  VARCHAR(150),
    IN  p_id_usuario            INT,
    IN  p_total                 DECIMAL(10,2),
    IN  p_detalle_json          JSON,
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

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1 p_mensaje = MESSAGE_TEXT;
        SET p_id_venta = NULL;
    END;

    START TRANSACTION;

    SELECT serie_actual, (correlativo_actual + 1)
    INTO v_serie, v_correlativo
    FROM Tipos_Comprobantes
    WHERE id_tipo_comprobante = p_id_tipo_comprobante
    FOR UPDATE;

    UPDATE Tipos_Comprobantes
    SET correlativo_actual = correlativo_actual + 1
    WHERE id_tipo_comprobante = p_id_tipo_comprobante;

    SET v_numero_doc = LPAD(v_correlativo, 8, '0');

    CALL sp_buscar_o_crear_cliente(
        p_numero_documento_cli,
        p_nombres_razon_social,
        v_id_cliente
    );

    INSERT INTO Ventas (
        id_tipo_comprobante, serie_documento, numero_documento,
        id_cliente, id_usuario, total
    ) VALUES (
        p_id_tipo_comprobante, v_serie, v_numero_doc,
        v_id_cliente, p_id_usuario, p_total
    );
    SET p_id_venta = LAST_INSERT_ID();

    SET v_total_items = JSON_LENGTH(p_detalle_json);

    WHILE v_i < v_total_items DO
        SET v_id_producto    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto')));
        SET v_id_prod_precio = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto_precio')));
        SET v_cantidad       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].cantidad')));
        SET v_precio_unit    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].precio_unitario')));
        SET v_subtotal       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].subtotal')));

        INSERT INTO Detalle_Ventas (
            id_venta, id_producto, id_producto_precio,
            cantidad, precio_unitario, subtotal
        ) VALUES (
            p_id_venta, v_id_producto, v_id_prod_precio,
            v_cantidad, v_precio_unit, v_subtotal
        );

        SET v_i = v_i + 1;
    END WHILE;

    COMMIT;

    SET p_serie            = v_serie;
    SET p_numero_documento = v_numero_doc;
    SET p_mensaje          = 'Venta registrada correctamente';
END ;;
DELIMITER ;
