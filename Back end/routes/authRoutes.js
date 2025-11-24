import express from "express";
import { 
    registerUser, 
    loginUser, 
    updateProfile,
    enviarCodigoReset,
    verificarCodigoReset,
    redefinirPassword
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota de registro
router.post("/register", registerUser);

// Rota de login
router.post("/login", loginUser);

// Rotas de recuperação de password
router.post("/forgot-password", enviarCodigoReset);
router.post("/verify-code", verificarCodigoReset);
router.post("/reset-password", redefinirPassword);

// Rota protegida de perfil do usuário
router.get("/profile", protect, (req, res) =>{
    res.json ({
        message: "Perfil do utilizador carregado com sucesso",
        user: req.cliente,
    });

});

router.put("/profile", protect, updateProfile);




export default router;