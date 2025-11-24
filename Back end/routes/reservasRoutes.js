import express from "express";
import {
    createReserva,
    getAllReservas,
    getReservaById,
    updateReserva,
    deleteReserva,  
} from "../controllers/reservaController.js"

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar nova reserva(usuário precisa estar logado)
router.post("/", protect, createReserva);

// Listar todas as reservas
router.get("/", protect,  getAllReservas);

// Obter reserva por ID
router.get("/:id", protect, getReservaById);

// Atualizar reserva
router.put("/:id", protect, updateReserva);

// Eliminar reserva
router.delete("/:id", protect, deleteReserva);


export default router;