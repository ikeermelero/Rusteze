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

export default {
    getAllUsersByGarageId,
}
