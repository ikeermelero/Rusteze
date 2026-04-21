import { userModel, roleModel } from "../models/index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function getAllUsersByGarageId(id) {
    try {
        const users = await userModel.findAll({
            where: { id_taller: id },
            include: [{
                model: roleModel,
                where: { name: "Cliente" },
            }],
        });
        return users;
    } catch (e) {
        throw new Error(e.message);
    }
}

// --- NUEVAS FUNCIONES PARA TU TAREA ---

async function register(userData) {
    try {
        // Hasheamos la contraseña: '1234' -> '$2b$10$asdf...'
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        const newUser = await userModel.create({
            ...userData,
            password_hash: hashedPassword
            // id_role y id_taller deberían venir en userData desde el formulario o controlador
        });
        return newUser;
    } catch (e) {
        throw new Error("Error en el registro: " + e.message);
    }
}

async function login(email, password) {
    try {
        const user = await userModel.findOne({ where: { email } });
        
        if (!user) {
            throw new Error("El usuario no existe");
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }

        return user;
    } catch (e) {
        throw new Error("Error en el login: " + e.message);
    }
}

export default {
    getAllUsersByGarageId,
    register,
    login
}