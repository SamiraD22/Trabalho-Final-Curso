import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import carrosRoutes from "./routes/carrosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import reservaRoutes from "./routes/reservasRoutes.js";
import pagamentoRoutes from "./routes/pagamentoRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";


dotenv.config();

// Inicializa o app primeiro
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/pagamento", pagamentoRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/auth", authRoutes);

// Porta
const PORT = process.env.PORT || 5000;

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/rentalcarcv", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log(" MongoDB Conectado com sucesso ");
    app.listen(PORT, () =>
      console.log(` Servidor rodando na porta ${PORT} `)
  );
  })

  .catch((err) => console.error ("Erro ao conectar com MongoDB:", err));
