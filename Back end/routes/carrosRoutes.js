
import express from "express";
import {
    createCar, 
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

// Criar um novo carro
router.post("/", createCar);

// Listar todos os carros
router.get("/", getAllCars);

// Obter carro por ID
router.get("/:id", getCarById);

// Atualizar um carro
router.put("/:id", updateCar);

// Eiminar um carro
router.delete("/:id", deleteCar);

export default router;