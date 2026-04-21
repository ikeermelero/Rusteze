import { Repair, Car } from "../../models/index.js";

const getParsedId = (id) => parseInt(id);

async function getAllRepairs(req, res) {
    const repairs = await Repair.findAll({
        include: [{ model: Car }]
    });
    res.render('repairs', { repairs });

}

async function getRepairById(req, res) {
    const id = getParsedId(req.params.id);

    const repair = await Repair.findByPk(id, {
        include: [{ model: Car }]
    });
    res.render('repairDetail', { repair });
}



export const functions = {
    getAllRepairs,
    getRepairById,
    createRepair
}