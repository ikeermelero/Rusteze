import userModel from "../../models/user.model.js";
import roleModel from "../../models/role.model.js";
import garageModel from "../../models/garage.model.js";
import taskModel from "../../models/task.model.js";

//Sacar todos los usuarios (cliente) por id de taller
async function getAllUsersByGarageId(req, res) {
  try {
    const { id } = req.params;
    const users = await userModel.findAll({
      where: { ID_TALLER: id },
      include: [
        {
          model: roleModel,
          where: { NAME: "Cliente" },
        },
      ],
    });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export const functions = {
  getAllUsersByGarageId,
};
