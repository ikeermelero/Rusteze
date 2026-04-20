import { Router } from "express";
import repairController from "../../controller/api/repair.controller.js";

const router = Router();

router.get("/:id",repairController.getAllRepairsInProgress);

