import express from "express";
import { realizarPagamento } from "../controllers/pagamentoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Realizar pagamento
router.post("/", protect, realizarPagamento);


export default router;