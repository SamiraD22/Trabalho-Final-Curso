import jwt from "jsonwebtoken";
import Cliente from "../models/clienteModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    // Validar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersegredo123"
    );

    // Buscar cliente autenticado
    req.cliente = await Cliente.findById(decoded.id).select("-password");

    if (!req.cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    next();

  } catch (error) {
    return res.status(401).json({ message: "Token inválido", error: error.message });
  }
};
