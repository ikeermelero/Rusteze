import repairModel from "../../models/repair.model.js";

async function getAllRepairsInProgress(req, res){
 try{
    const { id } = req.params;

    const repairs = await repairModel.findAll({
      where: { STATUS: 'IN_PROGRESS' },
      include: [
        {
          model: carModel,
          include: [
            {
              model: userModel,
              where: { ID_TALLER: id },
              include: [
                {
                  model: roleModel,
                  where: { NAME: 'Cliente' },
                },
              ],
            },
          ],
        },
      ],
    });
    return res.status(200).json(repairs);

 }catch(e){
    return res.status(500).json({message: e.message});
 }
}

export const functions = {
  getAllRepairsInProgress,
};
