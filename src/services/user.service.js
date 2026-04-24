import { userModel } from "../models/index.js";
import bcrypt from 'bcrypt';

async function createUser(userData) {
  try {
    // IMPORTANTE: Cambiamos .password por .password_hash que es lo que viene del Pug
    const passwordToHash = userData.password_hash || userData.password;
    
    if (!passwordToHash) {
        throw new Error("La contraseña es obligatoria");
    }

    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    // Usamos los nombres de las propiedades definidos en tu modelo (minúsculas)
    // Sequelize se encarga de pasarlo a MAYÚSCULAS por el "field" que configuramos
    const newUser = await userModel.create({
      id_role: userData.id_role || 3, 
      id_taller: userData.id_taller || null,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password_hash: hashedPassword 
    });
    return newUser;
  } catch (e) {
    throw new Error("Error en el servicio al crear usuario: " + e.message);
  }
}

async function getUserByEmail(email) {
  try {
    // Buscamos por el nombre de la propiedad en el modelo
    return await userModel.findOne({ where: { email: email } });
  } catch (e) {
    throw new Error("Error al buscar usuario: " + e.message);
  }
}

async function updatePassword(email, newHashedPassword) {
  try {
    return await userModel.update(
      { password_hash: newHashedPassword }, 
      { where: { email: email } }
    );
  } catch (e) {
    throw new Error("Error al actualizar la contraseña: " + e.message);
  }
}

export default {
    createUser,
    getUserByEmail,
    updatePassword,
};