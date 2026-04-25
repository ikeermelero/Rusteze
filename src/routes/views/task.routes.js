import { Router } from "express";
import taskController from "../../controller/views/task.controller.js";

const router = Router();

router.post('/:id_tareas/update-status', taskController.changeTaskStatus);

export default router;