import {userModel, roleModel} from "../models/index.js";

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


async function getAllUsersByGarageId (id){
try {
    console.log("User Services:", id);
    const users = await userModel.findAll({
      where: { id_taller: id },
      include: [
        {
          model: roleModel,
          where: { name: "Cliente" },
        },
      ],
    });
    return users;
  } catch (e) {
    throw new Error("Error al actualizar la contraseña: " + e.message);
  }
}

async function getAllUsers() {
    const users = await UserModel.findAll();
    return users;
}

async function getUserByEmail(email){
    const user = await UserModel.findOne({where:{email}});
    return user;
}

async function getUserById(id){
    const user = await UserModel.findByPk(id);
    return user;
}

async function createUser(data){
    const newUser = await UserModel.create(data);
    return newUser;
}

async function getAllUsers() {
    const users = await UserModel.findAll();
    return users;
}

async function getUserByEmail(email){
    const user = await UserModel.findOne({where:{email}});
    return user;
}

async function getUserById(id){
    const user = await UserModel.findByPk(id);
    return user;
}

async function createUser(data){
    const newUser = await UserModel.create(data);
    return newUser;
}

export default {
    createUser,
    getUserByEmail,
    updatePassword,
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail
};