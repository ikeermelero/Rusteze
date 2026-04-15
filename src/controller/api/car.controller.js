/* import carModel from "../../models/car.model.js";
import { IdNotFoundError } from "../../utils/errors/car.errors.js";

function getAllCars(req, res) {
    const cars = carModel.getAllCars();
    res.status(200).json(cars);
} */
/*
function getCarById(req, res) {
    const id = req.params.id;
    const idNum = parseInt(id);
    if(!idNum || isNaN(idNum)){ throw new IdNotFoundError(id);}

    const car = carModel.getCarById(id);
    if(!car){ return res.status(404).json({ message: "Car not found"});}

    res.status(200).json(car);
}

function createCar (req, res) {
    const carData = req.body
    data


    }

*/

/* export default {
    getAllCars,
} */