import Reservation from "../models/reservation.model.js";
import Car from "../models/car.model.js";

export const reservationService = {
    
    getReservationsWithCars: async () => {
        return await Reservation.findAll({
            include: [{ model: Car }]
        });
    },

    create: async (data) => {
        return await Reservation.create({
            id_car: data.id_car,
            start_date: data.start_date,
            description: data.description,
            status: 'CONFIRMADA'
        });
    },

    delete: async (id) => {
        return await Reservation.destroy({ 
            where: { id_reservation: id } 
        });
    }
};