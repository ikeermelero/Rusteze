import { taskModel } from "../models/index.js";



/* async function getAll...ById (id){

} */

async function updateTaskStatus(id_tareas, status) {
    return await taskModel.update(
        { status },
        { where: { id_tareas } }
    );
}

export default {
    updateTaskStatus
};