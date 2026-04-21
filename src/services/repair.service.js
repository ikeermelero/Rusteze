import { repairModel, carModel, userModel } from '../models/index.js';


async function findAllRepairs() {
    return await repairModel.findAll({
        include: [{
            model: carModel,
            attributes: ['brand', 'model', 'plate'],
            include: [{
                model: userModel,
                attributes: ['name', 'surname']
            }]
        }],
        order: [['created_at', 'DESC']]
    });
}


async function findRepairById(id) {
    return await repairModel.findByPk(id, {
        include: [{
            model: carModel,
            include: [{
                model: userModel,
                attributes: ['name', 'surname', 'phone', 'email']
            }]
        }]
    });
}

async function createRepair(repairData) {

    return await repairModel.create(repairData);
}

export default {
    findAllRepairs,
    findRepairById,
    createRepair
};