
CREATE TABLE ROLES (
    ID_ROLE SERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    PRIORITY INTEGER
);

CREATE TABLE TALLERES (
    ID_TALLER SERIAL PRIMARY KEY,
    ADDRESS VARCHAR(255),
    CITY VARCHAR(100),
    PHONE VARCHAR(20),
    GMAIL VARCHAR(100)
);

-- 3. USERS (Sustituido APE1/APE2 por SURNAME según tu último esquema)
CREATE TABLE USERS (
    ID_USER SERIAL PRIMARY KEY,
    ID_ROLE INTEGER NOT NULL,
    ID_TALLER INTEGER,
    NAME VARCHAR(100),
    SURNAME VARCHAR(100),
    EMAIL VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD_HASH VARCHAR(255),
    PHONE VARCHAR(20),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_USER_ROLE FOREIGN KEY (ID_ROLE) REFERENCES ROLES(ID_ROLE),
    CONSTRAINT FK_USER_TALLER FOREIGN KEY (ID_TALLER) REFERENCES TALLERES(ID_TALLER)
);

-- 4. CARS
CREATE TABLE CARS (
    ID_CAR SERIAL PRIMARY KEY,
    ID_USER INTEGER NOT NULL,
    BRAND VARCHAR(50),
    MODEL VARCHAR(50),
    PLATE VARCHAR(20) UNIQUE NOT NULL,
    COLOR VARCHAR(30),
    YEAR INTEGER,
    CONSTRAINT FK_CAR_USER FOREIGN KEY (ID_USER) REFERENCES USERS(ID_USER) ON DELETE CASCADE
);

-- 5. RESERVATIONS (Nueva tabla en tu esquema)

CREATE TABLE RESERVATIONS (
    ID_RESERVATION SERIAL PRIMARY KEY,
    ID_USER INTEGER NOT NULL,
    ID_CAR INTEGER NOT NULL,
    ID_TALLER INTEGER NOT NULL,
    DATE TIMESTAMP NOT NULL,
    DURATION INTEGER, -- minutos
    STATUS VARCHAR(50),
    VOTES INTEGER,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_RES_USER FOREIGN KEY (ID_USER) REFERENCES USERS(ID_USER),
    CONSTRAINT FK_RES_CAR FOREIGN KEY (ID_CAR) REFERENCES CARS(ID_CAR),
    CONSTRAINT FK_RES_TALLER FOREIGN KEY (ID_TALLER) REFERENCES TALLERES(ID_TALLER)
);

-- 6. REPAIRS
CREATE TABLE REPAIRS (
    ID_REPAIR SERIAL PRIMARY KEY,
    ID_CAR INTEGER NOT NULL,
    STATUS VARCHAR(50),
    DIAGNOSIS TEXT,
    TOTAL_COST DECIMAL(12, 2) DEFAULT 0.00,
    START_DATE DATE,
    END_DATE DATE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_REPAIR_CAR FOREIGN KEY (ID_CAR) REFERENCES CARS(ID_CAR) ON DELETE CASCADE
);

-- 7. TASKS
CREATE TABLE TASKS (
    ID_TAREAS SERIAL PRIMARY KEY,
    ID_REPAIR INTEGER NOT NULL,
    ID_USER INTEGER, -- Mecánico asignado
    NAME VARCHAR(100),
    DESCRIPTION TEXT,
    STATUS VARCHAR(50),
    ESTIMATED_TIME INTEGER,
    COST DECIMAL(12, 2),
    CONSTRAINT FK_TASK_REPAIR FOREIGN KEY (ID_REPAIR) REFERENCES REPAIRS(ID_REPAIR) ON DELETE CASCADE,
    CONSTRAINT FK_TASK_USER FOREIGN KEY (ID_USER) REFERENCES USERS(ID_USER)
);

-- 8. INVOICES

CREATE TABLE INVOICES (
    ID_INVOICE SERIAL PRIMARY KEY,
    ID_REPAIR INTEGER NOT NULL UNIQUE,
    TOTAL DECIMAL(12, 2),
    ISSUED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_INV_REPAIR FOREIGN KEY (ID_REPAIR) REFERENCES REPAIRS(ID_REPAIR) ON DELETE CASCADE
);








-------------------------------------------------------
-- 1. INSERTAR ROLES
-------------------------------------------------------
INSERT INTO ROLES (NAME, PRIORITY) VALUES 
('Admin', 1), 
('Mecanico', 2), 
('Cliente', 3);

-------------------------------------------------------
-- 2. INSERTAR 3 TALLERES
-------------------------------------------------------
INSERT INTO TALLERES (ADDRESS, CITY, PHONE, GMAIL) VALUES 
('Polígono Industrial Norte', 'Madrid', '910000001', 'taller.madrid@gmail.com'),
('Calle del Motor, 45', 'Barcelona', '930000002', 'taller.bcn@gmail.com'),
('Avenida de la Paz, 10', 'Sevilla', '950000003', 'taller.sevilla@gmail.com');

-------------------------------------------------------
-- 3. INSERTAR 3 MECÁNICOS (Uno para cada taller)
-------------------------------------------------------
INSERT INTO USERS (ID_ROLE, ID_TALLER, NAME, SURNAME, EMAIL, PASSWORD_HASH) VALUES
(2, 1, 'Juan', 'Mecánico Madrid', 'mecanico1@taller.com', 'hash123'),
(2, 2, 'Pedro', 'Mecánico Barna', 'mecanico2@taller.com', 'hash123'),
(2, 3, 'Luis', 'Mecánico Sevilla', 'mecanico3@taller.com', 'hash123');

-------------------------------------------------------
-- 4. INSERTAR 30 CLIENTES Y 30 COCHES
-------------------------------------------------------
-- Utilizamos un bloque DO para automatizar la creación de 30 clientes y sus coches
DO $$
DECLARE
    i INT;
    v_user_id INT;
BEGIN
    FOR i IN 1..30 LOOP
        -- Insertar Cliente
        INSERT INTO USERS (ID_ROLE, NAME, SURNAME, EMAIL, PASSWORD_HASH)
        VALUES (3, 'Cliente_' || i, 'Apellido_' || i, 'cliente' || i || '@gmail.com', 'pwd_hash')
        RETURNING ID_USER INTO v_user_id;

        -- Insertar Coche para ese cliente
        INSERT INTO CARS (ID_USER, BRAND, MODEL, PLATE, COLOR, YEAR)
        VALUES (v_user_id, 'Marca_' || (i % 5 + 1), 'Modelo_Standard', 'PLATE-' || (1000 + i), 'Blanco', 2020);
    END LOOP;
END $$;

-------------------------------------------------------
-- 5. REPARACIONES, FACTURAS Y TAREAS
-------------------------------------------------------
DO $$
DECLARE
    t_id INT; -- Taller
    c_idx INT; -- Índice de cliente
    r_id INT; -- ID de reparación generada
    mecanico_id INT;
BEGIN
    FOR t_id IN 1..3 LOOP
        -- Seleccionamos al mecánico del taller actual para registrar las reparaciones
        SELECT ID_USER INTO mecanico_id FROM USERS WHERE ID_TALLER = t_id LIMIT 1;

        -- A. 3 REPARACIONES ACTIVAS (IN_PROGRESS) por taller
        -- Clientes: 1-3 para T1, 11-13 para T2, 21-23 para T3
        FOR c_idx IN ((t_id-1)*10 + 1)..((t_id-1)*10 + 3) LOOP
            INSERT INTO REPAIRS (ID_CAR, STATUS, DIAGNOSIS, START_DATE)
            VALUES (c_idx, 'IN_PROGRESS', 'Revisión de motor en curso', CURRENT_DATE)
            RETURNING ID_REPAIR INTO r_id;

            -- Crear Reservas para estas reparaciones activas
            INSERT INTO RESERVATIONS (ID_USER, ID_CAR, ID_TALLER, DATE, STATUS)
            VALUES (c_idx + 3, c_idx, t_id, CURRENT_TIMESTAMP, 'OPEN');
        END LOOP;

        -- B. 7 REPARACIONES COMPLETADAS (COMPLETED)
        -- Las enviamos a un taller diferente (el siguiente en la lista)
        FOR c_idx IN ((t_id-1)*10 + 4)..((t_id-1)*10 + 10) LOOP
            INSERT INTO REPAIRS (ID_CAR, STATUS, DIAGNOSIS, TOTAL_COST, START_DATE, END_DATE)
            VALUES (c_idx, 'COMPLETED', 'Cambio de aceite y filtros finalizado', 250.00, CURRENT_DATE - 5, CURRENT_DATE)
            RETURNING ID_REPAIR INTO r_id;

            -- 1. Crear Factura
            INSERT INTO INVOICES (ID_REPAIR, TOTAL) 
            VALUES (r_id, 250.00);

            -- 2. Crear 5 Tareas por cada reparación completada
            FOR k IN 1..5 LOOP
                INSERT INTO TASKS (ID_REPAIR, ID_USER, NAME, STATUS, COST)
                VALUES (r_id, mecanico_id, 'Tarea de mantenimiento ' || k, 'DONE', 50.00);
            END LOOP;
        END LOOP;
    END LOOP;
END $$;


