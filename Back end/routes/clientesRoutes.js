import express from "express";

import {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
} from "../controllers/clienteController.js";

import { updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar novo cliente
router.post("/", protect, createCliente);

// Listar todos os clientes
router.get("/", protect, getAllClientes);

// Obter cliente por ID
router.get("/:id", protect, getClienteById);

// Atualizar cliente
router.put("/:id", protect, updateCliente);

// Eliminar cliente
router.delete("/:id", protect, deleteCliente);

// Atualizar perfil (rota protegida)
router.put("/perfil", protect, updateProfile);

export default router;