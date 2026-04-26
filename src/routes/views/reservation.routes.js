import { Router } from "express";
import reservationController from "../../controller/views/reservation.controller.js";
import { isLoggedIn } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isLoggedIn, reservationController.viewReservations);
router.post("/", isLoggedIn, reservationController.createReservation);
router.post("/delete/:id", isLoggedIn, reservationController.deleteReservation);

export default router;