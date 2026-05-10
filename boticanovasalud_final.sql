-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2026 a las 03:45:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `boticanovasalud_final`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_cliente` (IN `p_id_cliente` INT, IN `p_numero_documento` CHAR(11), IN `p_nombres_razon_social` VARCHAR(150))   BEGIN
                UPDATE Clientes
                SET numero_documento = p_numero_documento,
                    nombres_razon_social = p_nombres_razon_social
                WHERE id_cliente = p_id_cliente;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_producto` (IN `p_id_producto` INT, IN `p_nombre_comercial` VARCHAR(100), IN `p_stock_actual` INT, IN `p_stock_minimo` INT, IN `p_categoria` VARCHAR(100))   BEGIN
                DECLARE v_id_cat INT;

                -- Categoría
                SELECT id_categoria INTO v_id_cat FROM Categorias WHERE nombre_categoria = p_categoria LIMIT 1;
                IF v_id_cat IS NULL THEN
                    INSERT INTO Categorias (nombre_categoria) VALUES (p_categoria);
                    SET v_id_cat = LAST_INSERT_ID();
                END IF;

                UPDATE Productos
                SET 
                    nombre_comercial = p_nombre_comercial,
                    stock_actual_unidades = p_stock_actual,
                    stock_minimo_unidades = p_stock_minimo,
                    id_categoria = v_id_cat
                WHERE id_producto = p_id_producto;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_usuario` (IN `p_id_usuario` INT, IN `p_username` VARCHAR(50), IN `p_password_hash` VARCHAR(255), IN `p_id_empleado` INT)   BEGIN
        IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = p_id_usuario) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Usuario no encontrado';
        END IF;
        
        IF EXISTS (SELECT 1 FROM Usuarios WHERE username = p_username AND id_usuario <> p_id_usuario) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Ya existe otro usuario con ese username';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM Empleados WHERE id_empleado = p_id_empleado) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'El empleado especificado no existe';
        END IF;
        
        IF EXISTS (SELECT 1 FROM Usuarios WHERE id_empleado = p_id_empleado AND id_usuario <> p_id_usuario) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Este empleado ya tiene otro usuario registrado';
        END IF;
        
        UPDATE Usuarios 
        SET 
            username = p_username,
            password_hash = p_password_hash,
            id_empleado = p_id_empleado
        WHERE id_usuario = p_id_usuario;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_precio_producto` (IN `p_id_producto` INT, IN `p_nombre_unidad` VARCHAR(50), IN `p_cantidad_equivalente` INT, IN `p_precio_venta` DECIMAL(10,2))   BEGIN
                DECLARE v_id_unidad INT;

                -- Unidad Medida
                SELECT id_unit INTO v_id_unidad FROM Unidades_Medida WHERE nombre_unidad = p_nombre_unidad LIMIT 1;
                IF v_id_unidad IS NULL THEN
                    INSERT INTO Unidades_Medida (nombre_unidad) VALUES (p_nombre_unidad);
                    SET v_id_unidad = LAST_INSERT_ID();
                END IF;

                INSERT INTO Productos_Precios (
                    id_producto, id_unidad, cantidad_equivalente, precio_venta
                ) VALUES (
                    p_id_producto, v_id_unidad, p_cantidad_equivalente, p_precio_venta
                );
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_cliente` (IN `p_numero_documento` VARCHAR(20))   BEGIN
    SELECT 
        id_cliente,
        numero_documento,
        nombres_razon_social
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_o_crear_cliente` (IN `p_numero_documento` VARCHAR(20), IN `p_nombres_razon_social` VARCHAR(150), OUT `p_id_cliente` INT)   BEGIN
    
    SELECT id_cliente INTO p_id_cliente
    FROM Clientes
    WHERE numero_documento = p_numero_documento
    LIMIT 1;

    
    IF p_id_cliente IS NULL THEN
        INSERT INTO Clientes (numero_documento, nombres_razon_social)
        VALUES (p_numero_documento, p_nombres_razon_social);
        SET p_id_cliente = LAST_INSERT_ID();
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_producto` (IN `_termino` VARCHAR(100))   BEGIN
    SELECT 
        p.id_producto,
        p.nombre_comercial,
        p.principio_activo,
        p.stock_actual_unidades,
        l.nombre_laboratorio,
        c.nombre_categoria,
        pres.nombre_presentacion,
        pp.id_producto_precio,
        pp.precio_venta,
        u.nombre_unidad
    FROM Productos p
    LEFT JOIN Laboratorios l ON p.id_laboratorio = l.id_laboratorio
    LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN Presentaciones pres ON p.id_presentacion = pres.id_presentacion
    INNER JOIN Productos_Precios pp ON p.id_producto = pp.id_producto
    INNER JOIN Unidades_Medida u ON pp.id_unidad = u.id_unit
    WHERE p.nombre_comercial LIKE CONCAT('%', _termino, '%') 
       OR p.principio_activo LIKE CONCAT('%', _termino, '%')
    ORDER BY p.nombre_comercial ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_productos` (IN `p_texto` VARCHAR(100))   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_usuario` (IN `p_username` VARCHAR(50))   BEGIN
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
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_cliente` (IN `p_numero_documento` CHAR(11), IN `p_nombres_razon_social` VARCHAR(150))   BEGIN
                INSERT INTO Clientes (numero_documento, nombres_razon_social)
                VALUES (p_numero_documento, p_nombres_razon_social);
                SELECT LAST_INSERT_ID() AS id_cliente;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_producto` (IN `p_nombre_comercial` VARCHAR(100), IN `p_principio_activo` VARCHAR(100), IN `p_laboratorio` VARCHAR(100), IN `p_categoria` VARCHAR(100), IN `p_presentacion` VARCHAR(100), IN `p_stock_inicial` INT, IN `p_stock_minimo` INT, OUT `p_id_producto` INT)   BEGIN
                DECLARE v_id_lab INT;
                DECLARE v_id_cat INT;
                DECLARE v_id_pres INT;

                -- Laboratorio
                SELECT id_laboratorio INTO v_id_lab FROM Laboratorios WHERE nombre_laboratorio = p_laboratorio LIMIT 1;
                IF v_id_lab IS NULL THEN
                    INSERT INTO Laboratorios (nombre_laboratorio) VALUES (p_laboratorio);
                    SET v_id_lab = LAST_INSERT_ID();
                END IF;

                -- Categoría
                SELECT id_categoria INTO v_id_cat FROM Categorias WHERE nombre_categoria = p_categoria LIMIT 1;
                IF v_id_cat IS NULL THEN
                    INSERT INTO Categorias (nombre_categoria) VALUES (p_categoria);
                    SET v_id_cat = LAST_INSERT_ID();
                END IF;

                -- Presentación
                SELECT id_presentacion INTO v_id_pres FROM Presentaciones WHERE nombre_presentacion = p_presentacion LIMIT 1;
                IF v_id_pres IS NULL THEN
                    INSERT INTO Presentaciones (nombre_presentacion) VALUES (p_presentacion);
                    SET v_id_pres = LAST_INSERT_ID();
                END IF;

                -- Insertar Producto
                INSERT INTO Productos (
                    id_laboratorio, id_categoria, id_presentacion,
                    nombre_comercial, principio_activo,
                    stock_actual_unidades, stock_minimo_unidades
                ) VALUES (
                    v_id_lab, v_id_cat, v_id_pres,
                    p_nombre_comercial, p_principio_activo,
                    p_stock_inicial, p_stock_minimo
                );

                SET p_id_producto = LAST_INSERT_ID();
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crear_usuario` (IN `p_username` VARCHAR(50), IN `p_password_hash` VARCHAR(255), IN `p_id_empleado` INT)   BEGIN
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
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dashboard_alertas` ()   BEGIN
                SELECT 
                    id_producto as id,
                    nombre_comercial as producto,
                    CONCAT(stock_actual_unidades, ' / ', stock_minimo_unidades) as stock,
                    'Crítico' as estado,
                    'error' as tipo
                FROM Productos
                WHERE stock_actual_unidades <= stock_minimo_unidades
                LIMIT 10;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dashboard_kpis` ()   BEGIN
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
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dashboard_ultimos_comprobantes` ()   BEGIN
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
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_dashboard_ventas_semana` ()   BEGIN
                SELECT 
                    DATE(fecha_hora) as fecha,
                    COALESCE(SUM(total), 0) as total_ventas
                FROM Ventas
                WHERE fecha_hora >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                GROUP BY DATE(fecha_hora)
                ORDER BY fecha ASC;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_detalle_venta_especifica` (IN `_id_venta` INT)   BEGIN
    SELECT 
        p.nombre_comercial,
        um.nombre_unidad,
        dv.cantidad,
        dv.precio_unitario,
        dv.subtotal
    FROM Detalle_Ventas dv
    INNER JOIN Productos p ON dv.id_producto = p.id_producto
    INNER JOIN Productos_Precios pp ON dv.id_producto_precio = pp.id_producto_precio
    INNER JOIN Unidades_Medida um ON pp.id_unit = um.id_unit
    WHERE dv.id_venta = _id_venta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_usuario` (IN `p_id_usuario` INT)   BEGIN
        IF p_id_usuario = 1 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'No se puede eliminar el usuario administrador principal';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = p_id_usuario) THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Usuario no encontrado';
        END IF;
        
        DELETE FROM Usuarios WHERE id_usuario = p_id_usuario;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_empleados` ()   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_precios_producto` (IN `p_id_producto` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_serie_correlativo` (IN `p_id_tipo` INT)   BEGIN
    SELECT 
        serie_actual              AS serie,
        (correlativo_actual + 1)  AS proximo_correlativo,
        LPAD(correlativo_actual + 1, 8, '0') AS numero_documento_preview
    FROM Tipos_Comprobantes
    WHERE id_tipo_comprobante = p_id_tipo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_tipos_comprobante` ()   BEGIN
    SELECT 
        id_tipo_comprobante,
        nombre_documento,
        serie_actual,
        correlativo_actual
    FROM Tipos_Comprobantes
    ORDER BY id_tipo_comprobante;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_todos_clientes` (IN `p_busqueda` VARCHAR(100))   BEGIN
                SELECT id_cliente, numero_documento, nombres_razon_social
                FROM Clientes
                WHERE p_busqueda = '' 
                   OR numero_documento LIKE CONCAT('%', p_busqueda, '%')
                   OR nombres_razon_social LIKE CONCAT('%', p_busqueda, '%')
                ORDER BY nombres_razon_social;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_todos_productos` ()   BEGIN
                SELECT 
                    p.id_producto,
                    CONCAT('P-', LPAD(p.id_producto, 4, '0')) as codigo,
                    p.nombre_comercial,
                    p.principio_activo,
                    p.stock_actual_unidades as stock_actual,
                    p.stock_minimo_unidades as stock_minimo,
                    c.nombre_categoria as categoria,
                    l.nombre_laboratorio as laboratorio,
                    pr.nombre_presentacion as presentacion,
                    CASE WHEN p.stock_actual_unidades <= p.stock_minimo_unidades THEN 'STOCK CRÍTICO' ELSE 'VIGENTE' END as estado,
                    pp.id_producto_precio,
                    um.nombre_unidad as unidad,
                    um.nombre_unidad as abreviatura,
                    pp.precio_venta,
                    pp.cantidad_equivalente as factor
                FROM Productos p
                JOIN Categorias c ON p.id_categoria = c.id_categoria
                JOIN Laboratorios l ON p.id_laboratorio = l.id_laboratorio
                JOIN Presentaciones pr ON p.id_presentacion = pr.id_presentacion
                LEFT JOIN Productos_Precios pp ON p.id_producto = pp.id_producto
                LEFT JOIN Unidades_Medida um ON pp.id_unidad = um.id_unit
                ORDER BY p.nombre_comercial;
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_todos_usuarios` (IN `p_busqueda` VARCHAR(100))   BEGIN
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
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_venta_detalle` (IN `p_id_venta` INT)   BEGIN
    
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_historial_ventas` ()   BEGIN
    SELECT 
        v.id_venta,
        v.fecha_hora,
        tc.nombre_documento AS comprobante,
        CONCAT(v.serie_documento, '-', v.numero_documento) AS correlativo,
        c.nombres_razon_social AS cliente,
        e.nombres AS vendedor,
        v.total
    FROM Ventas v
    INNER JOIN Tipos_Comprobantes tc ON v.id_tipo_comprobante = tc.id_tipo_comprobante
    INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
    INNER JOIN Usuarios u ON v.id_usuario = u.id_usuario
    INNER JOIN Empleados e ON u.id_empleado = e.id_empleado
    ORDER BY v.fecha_hora DESC; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listar_todos_productos` ()   BEGIN
    SELECT 
        p.id_producto,
        p.nombre_comercial,
        p.principio_activo,
        p.stock_actual_unidades,
        p.stock_minimo_unidades,
        l.nombre_laboratorio,
        cat.nombre_categoria
    FROM Productos p
    INNER JOIN Laboratorios l ON p.id_laboratorio = l.id_laboratorio
    INNER JOIN Categorias cat ON p.id_categoria = cat.id_categoria;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login` (IN `p_username` VARCHAR(50))   BEGIN
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
            END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrar_venta` (IN `p_id_tipo_comprobante` INT, IN `p_numero_documento_cli` VARCHAR(20), IN `p_nombres_razon_social` VARCHAR(150), IN `p_id_usuario` INT, IN `p_total` DECIMAL(10,2), IN `p_detalle_json` JSON, OUT `p_id_venta` INT, OUT `p_serie` CHAR(4), OUT `p_numero_documento` VARCHAR(10), OUT `p_mensaje` VARCHAR(200))   BEGIN
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

    
    SET v_total_items = JSON_LENGTH(p_detalle_json);

    WHILE v_i < v_total_items DO
        SET v_id_producto    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto')));
        SET v_id_prod_precio = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].id_producto_precio')));
        SET v_cantidad       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].cantidad')));
        SET v_precio_unit    = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].precio_unitario')));
        SET v_subtotal       = JSON_UNQUOTE(JSON_EXTRACT(p_detalle_json, CONCAT('$[',v_i,'].subtotal')));

        
        
        
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

    
    SET p_serie            = v_serie;
    SET p_numero_documento = v_numero_doc;
    SET p_mensaje          = 'Venta registrada correctamente';

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrar_venta_cabecera` (IN `_id_cliente` INT, IN `_id_usuario` INT, IN `_id_tipo_comprobante` INT, IN `_total` DECIMAL(10,2))   BEGIN
    DECLARE _serie CHAR(4);
    DECLARE _correlativo INT;
    DECLARE _numero_formateado VARCHAR(10);

    
    SELECT serie_actual, correlativo_actual + 1 
    INTO _serie, _correlativo
    FROM Tipos_Comprobantes 
    WHERE id_tipo_comprobante = _id_tipo_comprobante;

    
    SET _numero_formateado = LPAD(_correlativo, 6, '0');

    
    INSERT INTO Ventas (id_tipo_comprobante, serie_documento, numero_documento, fecha_hora, id_cliente, id_usuario, total)
    VALUES (_id_tipo_comprobante, _serie, _numero_formateado, NOW(), _id_cliente, _id_usuario, _total);

    
    UPDATE Tipos_Comprobantes 
    SET correlativo_actual = _correlativo 
    WHERE id_tipo_comprobante = _id_tipo_comprobante;

    
    SELECT LAST_INSERT_ID() AS id_venta, _serie AS serie, _numero_formateado AS numero;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrar_venta_detalle` (IN `_id_venta` INT, IN `_id_producto` INT, IN `_id_producto_precio` INT, IN `_cantidad` INT, IN `_precio_unitario` DECIMAL(10,2))   BEGIN
    
    INSERT INTO Detalle_Ventas (id_venta, id_producto, id_producto_precio, cantidad, precio_unitario, subtotal)
    VALUES (_id_venta, _id_producto, _id_producto_precio, _cantidad, _precio_unitario, (_cantidad * _precio_unitario));

    
    UPDATE Productos 
    SET stock_actual_unidades = stock_actual_unidades - _cantidad
    WHERE id_producto = _id_producto;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id_cargo`, `nombre_cargo`) VALUES
(1, 'Administrador'),
(2, 'Cajero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `descripcion`) VALUES
(1, 'Analgesicos', NULL),
(2, 'Antibioticos', NULL),
(3, 'Vitaminas y Suplementos', NULL),
(4, 'Antiinflamatorios', NULL),
(5, 'Antiacidos', NULL),
(6, 'Antialergicos', NULL),
(7, 'Antihipertensivos', NULL),
(8, 'Uso Externo', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `numero_documento` char(11) NOT NULL,
  `nombres_razon_social` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `numero_documento`, `nombres_razon_social`) VALUES
(1, '87654321', 'vizcarra'),
(2, '12345778', 'Juan Carlos Perez Lopez'),
(3, '98765432', 'Maria Elena Rodriguez'),
(4, '20512345123', 'FARMACIA SAN JUAN S.A.C.'),
(26, '12345678', 'pedro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

CREATE TABLE `detalle_ventas` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_producto_precio` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`id_detalle`, `id_venta`, `id_producto`, `id_producto_precio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES
(1, 1, 1, 1, 10, 0.50, 5.00),
(14, 24, 7, 15, 1, 12.90, 12.90),
(15, 25, 3, 7, 10, 1.20, 12.00),
(16, 26, 1, 3, 1, 40.00, 40.00);

--
-- Disparadores `detalle_ventas`
--
DELIMITER $$
CREATE TRIGGER `trg_reducir_stock_post_venta` AFTER INSERT ON `detalle_ventas` FOR EACH ROW BEGIN
    DECLARE v_cant_equivalente INT;

    
    SELECT pp.cantidad_equivalente
    INTO v_cant_equivalente
    FROM Productos_Precios pp
    WHERE pp.id_producto_precio = NEW.id_producto_precio;

    
    UPDATE Productos
    SET stock_actual_unidades = stock_actual_unidades - (NEW.cantidad * v_cant_equivalente)
    WHERE id_producto = NEW.id_producto;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_validar_stock_antes_venta` BEFORE INSERT ON `detalle_ventas` FOR EACH ROW BEGIN
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
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `dni` char(8) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `id_cargo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `dni`, `nombres`, `apellidos`, `id_cargo`) VALUES
(1, '12345678', 'Carlos', 'Mendoza Rios', 1),
(2, '87654321', 'Lucia', 'Torres Vargas', 2),
(4, '44332211', 'Ana', 'Flores Diaz', 2),
(5, '65478912', 'Luis', 'Gutierrez', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorios`
--

CREATE TABLE `laboratorios` (
  `id_laboratorio` int(11) NOT NULL,
  `nombre_laboratorio` varchar(100) NOT NULL,
  `contacto_proveedor` varchar(100) DEFAULT NULL,
  `telefono_contacto` varchar(15) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `laboratorios`
--

INSERT INTO `laboratorios` (`id_laboratorio`, `nombre_laboratorio`, `contacto_proveedor`, `telefono_contacto`, `estado`) VALUES
(1, 'Bayer', NULL, NULL, 1),
(2, 'MK', NULL, NULL, 1),
(3, 'Medifarma', NULL, NULL, 1),
(4, 'Genfar', NULL, NULL, 1),
(5, 'Farmindustria', NULL, NULL, 1),
(6, 'Teva', NULL, NULL, 1),
(7, 'Abbott', NULL, NULL, 1),
(8, 'Pfizer', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentaciones`
--

CREATE TABLE `presentaciones` (
  `id_presentacion` int(11) NOT NULL,
  `nombre_presentacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `presentaciones`
--

INSERT INTO `presentaciones` (`id_presentacion`, `nombre_presentacion`) VALUES
(1, 'Tableta'),
(2, 'Capsula'),
(3, 'Jarabe'),
(4, 'Inyectable'),
(5, 'Crema'),
(6, 'Gel'),
(7, 'Gotas'),
(8, 'Supositorio'),
(9, 'Parche'),
(10, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_laboratorio` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_presentacion` int(11) DEFAULT NULL,
  `nombre_comercial` varchar(100) NOT NULL,
  `principio_activo` varchar(100) DEFAULT NULL,
  `stock_actual_unidades` int(11) NOT NULL DEFAULT 0,
  `stock_minimo_unidades` int(11) NOT NULL DEFAULT 20,
  `fecha_vencimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_laboratorio`, `id_categoria`, `id_presentacion`, `nombre_comercial`, `principio_activo`, `stock_actual_unidades`, `stock_minimo_unidades`, `fecha_vencimiento`) VALUES
(1, 3, 1, 1, 'Paracetamol 500mg', 'Paracetamol', 90, 20, NULL),
(2, 3, 1, 1, 'Ibuprofeno 400mg', 'Ibuprofeno', 150, 20, NULL),
(3, 4, 3, 2, 'Amoxicilina 500mg', 'Amoxicilina', 90, 10, NULL),
(4, 1, 4, 1, 'Diclofenaco 50mg', 'Diclofenaco S-dico', 120, 15, NULL),
(5, 3, 5, 3, 'Omeprazol 20mg Jarabe', 'Omeprazol', 80, 10, NULL),
(6, 3, 3, 2, 'Vitamina C 1000mg', 'ücido Asc-rbico', 300, 30, NULL),
(7, 3, 1, 3, 'NihoFebril Jarabe 120ml', 'Paracetamol Pedihítrico', 59, 10, NULL),
(8, 4, 6, 1, 'Loratadina 10mg', 'Loratadina', 180, 20, NULL),
(9, 5, 7, 1, 'Enalapril 10mg', 'Enalapril Maleato', 250, 25, NULL),
(10, 3, 8, 5, 'Betametasona Crema 15g', 'Betametasona', 45, 5, NULL),
(11, 2, 2, 2, 'Azitromicina 500mg', 'Azitromicina', 70, 10, NULL),
(12, 1, 4, 4, 'Diclofenaco Inyectable 75mg', 'Diclofenaco S-dico', 30, 5, NULL),
(13, 1, 7, 1, 'Panadol', 'nose', 200, 10, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_precios`
--

CREATE TABLE `productos_precios` (
  `id_producto_precio` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_unidad` int(11) DEFAULT NULL,
  `cantidad_equivalente` int(11) NOT NULL,
  `precio_venta` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_precios`
--

INSERT INTO `productos_precios` (`id_producto_precio`, `id_producto`, `id_unidad`, `cantidad_equivalente`, `precio_venta`) VALUES
(1, 1, 1, 1, 0.50),
(2, 1, 2, 10, 4.50),
(3, 1, 4, 100, 40.00),
(4, 2, 1, 1, 0.60),
(5, 2, 2, 10, 5.50),
(6, 2, 4, 100, 50.00),
(7, 3, 1, 1, 1.20),
(8, 3, 3, 12, 13.00),
(9, 4, 1, 1, 0.40),
(10, 4, 2, 10, 3.50),
(11, 5, 5, 1, 18.50),
(12, 6, 1, 1, 1.00),
(13, 6, 2, 10, 9.00),
(14, 6, 4, 100, 85.00),
(15, 7, 5, 1, 12.90),
(16, 8, 1, 1, 0.80),
(17, 8, 2, 10, 7.00),
(18, 9, 1, 1, 0.35),
(19, 9, 2, 10, 3.00),
(20, 9, 4, 100, 28.00),
(21, 10, 5, 1, 9.50),
(22, 11, 1, 1, 3.50),
(23, 11, 3, 3, 9.90),
(24, 12, 6, 1, 2.50),
(25, 12, 5, 10, 22.00),
(26, 13, 7, 30, 53.00),
(27, 13, 8, 10, 19.50),
(28, 13, 1, 1, 2.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_comprobantes`
--

CREATE TABLE `tipos_comprobantes` (
  `id_tipo_comprobante` int(11) NOT NULL,
  `nombre_documento` varchar(20) NOT NULL,
  `serie_actual` char(4) NOT NULL,
  `correlativo_actual` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_comprobantes`
--

INSERT INTO `tipos_comprobantes` (`id_tipo_comprobante`, `nombre_documento`, `serie_actual`, `correlativo_actual`) VALUES
(1, 'BOLETA', 'B001', 4),
(2, 'FACTURA', 'F001', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_medida`
--

CREATE TABLE `unidades_medida` (
  `id_unit` int(11) NOT NULL,
  `nombre_unidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidades_medida`
--

INSERT INTO `unidades_medida` (`id_unit`, `nombre_unidad`) VALUES
(1, 'Unidad'),
(2, 'Blister x10'),
(3, 'Blister x12'),
(4, 'Caja x100'),
(5, 'Frasco'),
(6, 'Ampolla'),
(7, 'Caja'),
(8, 'Blíster');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `username`, `password_hash`, `id_empleado`) VALUES
(1, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 1),
(2, 'cajero1', '1ed4353e845e2e537e017c0fac3a0d402d231809b7989e90da15191c1148a93f', 2),
(3, 'cajero2', '1ed4353e845e2e537e017c0fac3a0d402d231809b7989e90da15191c1148a93f', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_tipo_comprobante` int(11) DEFAULT NULL,
  `serie_documento` char(4) DEFAULT NULL,
  `numero_documento` varchar(10) DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_cliente` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_tipo_comprobante`, `serie_documento`, `numero_documento`, `fecha_hora`, `id_cliente`, `id_usuario`, `total`) VALUES
(1, 1, 'B001', '00000001', '2026-05-09 07:38:27', 2, 1, 5.00),
(24, 1, 'B001', '00000002', '2026-05-09 20:00:42', 26, 1, 15.22),
(25, 1, 'B001', '00000003', '2026-05-09 21:45:48', 26, 1, 14.16),
(26, 1, 'B001', '00000004', '2026-05-09 21:51:26', 26, 1, 47.20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`);

--
-- Indices de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_producto_precio` (`id_producto_precio`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `id_cargo` (`id_cargo`);

--
-- Indices de la tabla `laboratorios`
--
ALTER TABLE `laboratorios`
  ADD PRIMARY KEY (`id_laboratorio`);

--
-- Indices de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  ADD PRIMARY KEY (`id_presentacion`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_laboratorio` (`id_laboratorio`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_presentacion` (`id_presentacion`);

--
-- Indices de la tabla `productos_precios`
--
ALTER TABLE `productos_precios`
  ADD PRIMARY KEY (`id_producto_precio`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_unidad` (`id_unidad`);

--
-- Indices de la tabla `tipos_comprobantes`
--
ALTER TABLE `tipos_comprobantes`
  ADD PRIMARY KEY (`id_tipo_comprobante`);

--
-- Indices de la tabla `unidades_medida`
--
ALTER TABLE `unidades_medida`
  ADD PRIMARY KEY (`id_unit`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_tipo_comprobante` (`id_tipo_comprobante`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `laboratorios`
--
ALTER TABLE `laboratorios`
  MODIFY `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `productos_precios`
--
ALTER TABLE `productos_precios`
  MODIFY `id_producto_precio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tipos_comprobantes`
--
ALTER TABLE `tipos_comprobantes`
  MODIFY `id_tipo_comprobante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `unidades_medida`
--
ALTER TABLE `unidades_medida`
  MODIFY `id_unit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_ventas`
--
ALTER TABLE `detalle_ventas`
  ADD CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  ADD CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `detalle_ventas_ibfk_3` FOREIGN KEY (`id_producto_precio`) REFERENCES `productos_precios` (`id_producto_precio`);

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorios` (`id_laboratorio`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`),
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_presentacion`) REFERENCES `presentaciones` (`id_presentacion`);

--
-- Filtros para la tabla `productos_precios`
--
ALTER TABLE `productos_precios`
  ADD CONSTRAINT `productos_precios_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `productos_precios_ibfk_2` FOREIGN KEY (`id_unidad`) REFERENCES `unidades_medida` (`id_unit`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_tipo_comprobante`) REFERENCES `tipos_comprobantes` (`id_tipo_comprobante`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `ventas_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
