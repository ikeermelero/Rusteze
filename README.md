# 🔧 RUST-EZE GARAGE — Sistema de Gestión de Talleres

> Plataforma de gestión interna diseñada para optimizar el flujo de trabajo en talleres mecánicos. Permite asignar reparaciones de forma eficiente entre los trabajadores y centraliza la recopilación y análisis de datos operativos.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Estructura de Rutas](#estructura-de-rutas)
- [Roles y Permisos](#roles-y-permisos)

---

## 📖 Descripción

**Rust-eze Garage** es una aplicación web MVC construida con Node.js y Express que permite a talleres mecánicos gestionar su operativa diaria:

- 👥 Gestión de clientes y sus vehículos
- 🔧 Seguimiento de reparaciones y tareas
- 📅 Sistema de reservas de citas
- 📊 Dashboard con estadísticas y gráficos por taller
- 🧾 Generación automática de facturas al completar reparaciones

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|-----------|-----------|
| Runtime | Node.js 22 |
| Framework | Express 5 |
| ORM | Sequelize 6 |
| Base de datos | PostgreSQL 16 |
| Motor de plantillas | Pug 3 |
| Autenticación | express-session + bcryptjs + JWT |
| Contenedores | Docker + Docker Compose |
| Dev tooling | Nodemon |

---

## 🏗️ Arquitectura del Proyecto

```
rusteze/
├── db/
│   └── scripts/
│       ├── 01_schema.sql        # Esquema de tablas
│       └── 02_data.db           # Datos de ejemplo
├── public/
│   └── style.css                # Estilos globales
├── src/
│   ├── config/
│   │   └── db.js                # Conexión Sequelize
│   ├── controller/
│   │   └── views/               # Controladores de vistas
│   ├── middlewares/
│   │   └── auth.middleware.js   # Autenticación y sesiones
│   ├── models/                  # Modelos Sequelize
│   │   ├── index.js             # Asociaciones entre modelos
│   │   ├── user.model.js
│   │   ├── car.model.js
│   │   ├── repair.model.js
│   │   ├── task.model.js
│   │   ├── reservation.model.js
│   │   ├── invoice.model.js
│   │   ├── garage.model.js
│   │   └── role.model.js
│   ├── routes/
│   │   └── views/               # Rutas Express
│   ├── services/                # Lógica de negocio
│   ├── utils/
│   └── views/                   # Plantillas Pug
│       ├── dashboard/
│       ├── errors/
│       ├── layout.pug
│       ├── auth.pug
│       ├── dashboard-admin.pug
│       ├── dashboard-employer.pug
│       ├── repair.pug
│       ├── repairDetail.pug
│       ├── reservation.pug
│       └── clientDetails.pug
├── docker-compose.yml
├── dockerfile
└── package.json
```

---

## 🗄️ Base de Datos

### Diagrama de entidades

```
ROLES ──< USERS >── TALLERES
            │
            ├──< CARS >──< REPAIRS >──< TASKS
            │                │
            │                └──< INVOICES
            │
            └──< RESERVATIONS
```

### Tablas principales

| Tabla | Descripción |
|-------|-------------|
| `roles` | Admin (1), Mecánico (2), Cliente (3) |
| `talleres` | Talleres físicos con dirección y contacto |
| `users` | Todos los usuarios del sistema |
| `cars` | Vehículos registrados por cliente |
| `repairs` | Expedientes de reparación |
| `tasks` | Tareas asignadas a mecánicos dentro de una reparación |
| `invoices` | Facturas generadas al completar reparaciones |
| `reservations` | Citas de taller |

### Datos de ejemplo incluidos

El script `02_data.db` carga automáticamente:
- 3 talleres (Madrid, Barcelona, Sevilla)
- 3 admins + 6 mecánicos
- 120 clientes (40 por taller)
- 120 coches
- Reparaciones activas y completadas con tareas e facturas

---

## 🚀 Instalación

### Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose instalados
- Puerto `3000` (backend), `5432` (PostgreSQL) y `8080` (pgAdmin) libres

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/ikeermelero/Rusteze.git
cd Rusteze

# 2. Crear el archivo de variables de entorno
cp .env.example .env
# → Edita .env con tus valores

# 3. Levantar los contenedores
docker compose up --build
```

La aplicación estará disponible en `http://localhost:3000`.

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Servidor
PORT=3000
HOST=localhost

# Base de datos
DB_HOST=db
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=rusteze

# Sesiones / JWT
JWT_SECRET=tu_secreto_super_seguro

# pgAdmin
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```

---

## ▶️ Ejecución

| Comando | Descripción |
|---------|-------------|
| `docker compose up --build` | Levanta todos los servicios (primera vez) |
| `docker compose up` | Levanta los servicios sin recompilar |
| `docker compose down` | Para y elimina los contenedores |
| `npm run dev` | Desarrollo local con Nodemon (sin Docker) |
| `npm start` | Producción local (sin Docker) |

### Servicios disponibles

| Servicio | URL |
|----------|-----|
| Aplicación web | http://localhost:3000 |
| pgAdmin | http://localhost:8080 |

---

## 🗺️ Estructura de Rutas

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/` | Landing page | Público |
| GET | `/login` | Formulario de login | Público |
| POST | `/login` | Procesar login | Público |
| GET | `/register` | Formulario de registro | Público |
| POST | `/register` | Crear cuenta | Público |
| GET | `/logout` | Cerrar sesión | Autenticado |
| GET | `/dashboard` | Panel principal | Autenticado |
| GET | `/repairs` | Lista de reparaciones | Autenticado |
| GET | `/repairs/:id` | Detalle de reparación | Autenticado |
| POST | `/task/:id/update-status` | Actualizar estado de tarea | Autenticado |
| GET | `/client` | Lista de clientes del taller | Autenticado |
| GET | `/client/:id` | Detalle de un cliente | Autenticado |
| GET | `/reservations` | Lista de reservas | Autenticado |
| POST | `/reservations` | Crear reserva | Autenticado |
| POST | `/reservations/delete/:id` | Eliminar reserva | Autenticado |

---

## 🔐 Roles y Permisos

| Rol | ID | Descripción |
|-----|----|-------------|
| **Admin** | 1 | Acceso completo. Ve estadísticas, clientes y reparaciones de su taller. |
| **Mecánico** | 2 | Acceso operativo. Gestiona reparaciones y actualiza el estado de tareas. |
| **Cliente** | 3 | Acceso limitado. Futuras funcionalidades de autoservicio. |

El sistema redirige automáticamente al dashboard correspondiente según el rol del usuario autenticado.

---

## 👥 Créditos

Desarrollado como proyecto de gestión interna para talleres mecánicos.  
Repositorio: [github.com/ikeermelero/Rusteze](https://github.com/ikeermelero/Rusteze)