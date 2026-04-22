import {userModel, roleModel} from "../models/index.js";

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
    throw new Error(e.message);
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

export default {
    getAllUsersByGarageId,
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail
}
