import taskService from "../../services/task.service.js";

const changeTaskStatus = async (req, res) => {
    const { id_tareas } = req.params;
    const { status, idRepair } = req.body;

    try {
        await taskService.updateTaskStatus(id_tareas, status);
        res.redirect(`/repairs/${idRepair}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al actualizar la tarea');
    }
}

export default {
    changeTaskStatus
}