import repairService from "../../services/repair.service.js";

async function getAllRepairs(req, res) {
    const repairs = await repairService.findAllRepairs();
    res.render('repair', { repairs });

}

async function getRepairById(req, res) {
    const id = parseInt(req.params.id);
    const repair = await repairService.findRepairById(id);
    res.render('repairDetail', { repair });
}

export default {
    getAllRepairs,
    getRepairById
};