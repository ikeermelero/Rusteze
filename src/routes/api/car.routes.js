import { Router } from "express";
//import carController from "../../controller/api/car.controller.js";

const router = Router();

//router.get("/", carController.getAllCars); 
router.get("/", (req,res)=>{
    res.status(200).send("Obtener todos los coches");
})

router.get("/:id", (req, res) => {
  res.status(200).send("Obtener un coche por id");
});

router.post("/", (req, res) => {
  res.status(200).send("Crear un coche");
});

router.put("/:id", (req, res) => {
  res.status(200).send("Actualizar un coche");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("Borrar un coche");
}); 

export default router;
