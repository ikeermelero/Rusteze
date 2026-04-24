import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
//import Role from '../models/role.model.js';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT =process.env.DB_PORT;
const DB_USER =process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME =process.env.DB_NAME;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",
    }
);

export async function checkDB(){
    try {
        await sequelize.authenticate()
        console.log('Conexión a la base de datos establecida correctamente.')
       
    } catch (e) {
        console.error('No se pudo conectar a la base de datos:', e)
        process.exit(1) // detenemos el proceso si no hay conexión
    }
}

export async function syncDB() {
    try {
        await sequelize.sync({ alter: true });
        console.log("base de datos sincronizada");

        // 1. Importamos los modelos dinámicamente para evitar el ReferenceError
        const { default: Role } = await import('../models/role.model.js');
        const { default: Garage } = await import('../models/garage.model.js'); 
        // Nota: He puesto 'Garage' porque en tu imagen_450689.jpg veo 'garage.model.js'. 
        // Si tu modelo se llama Taller, cámbialo aquí.

        // 2. Crear Roles si no existen
        const rolesCount = await Role.count();
        if (rolesCount === 0) {
            await Role.bulkCreate([
                { id_role: 1, name: 'admin' },
                { id_role: 2, name: 'user' }
            ]);
            console.log("✅ Roles iniciales creados");
        }

        // 3. Crear Taller/Garage inicial si no existe
        const garageCount = await Garage.count();
        if (garageCount === 0) {
            await Garage.create({
                id_taller: 1, // El ID que Luis está buscando
                name: 'Taller Rusteze Principal'
                // Añade aquí más campos si tu modelo los requiere obligatoriamente
            });
            console.log("✅ Taller inicial creado");
        }

    } catch (error) {
        console.error("no se ha podido sincronizar", error);
    }
}

export default sequelize;
