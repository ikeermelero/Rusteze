import { repairModel, carModel, userModel } from "../models/index.js";

/* async function getAll...ById (id){

} */

async function findAllRepairs() {
    return await repairModel.findAll({
        include: [{
            model: carModel,
            attributes: ['brand', 'model', 'plate'],
            include: [{
                model: userModel,
                attributes: ['name', 'surname']
            }]
        }]
    });

}

async function findRepairById() {
    return await repairModel.findByPk(id, {
        include: [{
            model: carModel,
            include: [{ model: userModel }]
        }]
    });

}

export default {
    findAllRepairs,
    findRepairById
}