import userModel from "../../models/user.model.js";

async function getAllUsers(req,res){
    const id = await parseInt(req.user.id);
    const user  =  await userModel.find
}

export const functions = {
    getAllUsers,
}