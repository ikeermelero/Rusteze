import { Router } from "express";
import reservationController from "../../controller/views/reservation.controller.js";
import { isLoggedIn } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", reservationController.viewReservations);
router.post("/", reservationController.createReservation);
router.post("/delete/:id", reservationController.deleteReservation);

export default router;