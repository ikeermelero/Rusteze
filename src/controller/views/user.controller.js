import userService from "../../services/user.service.js";
import User from "../../models/user.model.js";

// 1. Función para obtener usuarios por taller (API)
export async function getAllUsersByGarageId(req, res) {
    try {
        console.log("User Controller - Buscando taller ID:", req.params.id);
        const users = await userService.getAllUsersByGarageId(req.params.id);
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

// 2. Función para crear un nuevo usuario (Registro)
export async function createUser(req, res) {
    try {
        // Extraemos los datos del req.body (lo que viene del formulario Pug)
        const { name, surname, email, password_hash, phone } = req.body;
        
        // Creamos el registro. 
        // Importante: password_hash se encriptará en el modelo si pusiste el hook de bcrypt.
        await User.create({
            name,
            surname,
            email,
            password_hash, 
            phone,
            id_role: 2,    // Rol cliente/empleado por defecto
            id_taller: 1   // ID del taller asignado por defecto
        });

        // Redirigimos al login con un parámetro de éxito
        res.redirect('/auth/login?registered=true');
        
    } catch (error) {
        console.error("Error al crear usuario:", error);
        // Aquí podrías volver a renderizar la vista con un mensaje de error
        res.status(500).send("Error al registrarse. Posible email duplicado.");
    }
}

// Exportamos todas las funciones juntas
export default {
    getAllUsersByGarageId,
    createUser
};