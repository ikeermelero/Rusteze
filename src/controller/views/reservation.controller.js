import { reservationService } from "../../services/reservation.service.js";
import Car from "../../models/car.model.js"; 

const reservationController = {
    viewReservations: async (req, res) => {
        try {
            const reservations = await reservationService.getReservationsWithCars();
            const cars = await Car.findAll(); // Podrías llevar esto a un carService después
            
            res.render("reservations", { 
                reservations,
                cars, 
                user: req.session.user
            });
        } catch (error) {
            console.error("View Error:", error);
            res.status(500).send("Error al cargar la página");
        }
    },

    createReservation: async (req, res) => {
        try {
            const { id_car, start_date, description } = req.body;

            if (!id_car || !start_date) {
                return res.status(400).send("Faltan datos obligatorios");
            }

            await reservationService.create({ id_car, start_date, description });

            res.redirect("/views/reservations");
        } catch (error) {
            console.error("Create Error:", error);
            res.status(500).send("Error al crear la reserva.");
        }
    },

    deleteReservation: async (req, res) => {
        try {
            const { id } = req.params;
            await reservationService.delete(id);
            res.redirect("/views/reservations");
        } catch (error) {
            console.error("Delete Error:", error);
            res.status(500).send("No se pudo eliminar la reserva");
        }
    }
};

export default reservationController;