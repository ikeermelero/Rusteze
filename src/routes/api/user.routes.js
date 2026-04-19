import { Router } from "express";
import userController from "../../controller/api/user.controller.js";
const router = Router();

router.get("/:id",userController.getAllUsersByGarageId);



/* router.get("/:id", (req, res) => {
    /* const id = req.params.id
    const user = user.find(u => u.id === id)
    res.status(200).json(users); 
});

router.post("/"), (req, res) => {
    
}

router.put("/:id"), (req, res) => {
    
}

router.delete("/:id"), (req, res) => {
    
} */


export default router;
