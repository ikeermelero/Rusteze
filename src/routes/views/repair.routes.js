import { Router } from "express";
import repairController from "../../controller/views/repair.controller.js";

const router = Router();

router.get("/", repairController.getAllRepairs);

router.get("/create", repairController.renderCreateForm);

router.get("/:id", repairController.getRepairById);


export default router;