import express from "express";
import {
    enviarCodigoRecuperacao,
    verificarCodigo,
    redefinirPassword
} from "../controllers/passwordResetController.js";

const router = express.Router();

// Enviar código (Simula SMS)
router.post("/enviar-codigo", enviarCodigoRecuperacao);

// Verificar código
router.post("/verificar-codigo", verificarCodigo);

// Redefinir password
router.post("/redefinir", redefinirPassword);

export default router;