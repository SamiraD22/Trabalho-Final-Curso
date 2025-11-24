import { error } from "console";
import Cliente from "../models/clienteModel.js";
import crypto from "crypto";

// passo 1: Enviar código (Simulado)
export const enviarCodigoRecuperacao = async (req, res) => {
    try {
        const { email } = req.body;

        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            return res.status(404).json({ message: "Email não encontrado" });
        }

        // Gerar código de 6 digitos
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();

        // Guardar código temporariamente no BD (válido por 10 minutos)
        cliente.resetCode = codigo;
        cliente.resetCodeExpire = Date.now() + 10 * 60 * 1000;
        await cliente.save();

        console.log("Código de recuperação (Simulado):", codigo);

        res.json ({
            message: "Código enviado (simulado). Veja no console do servidor.",
            codigo,
        });

    } catch (err) {
        res.status(500).json({ message: "Erro ao enviar código", error: err.message });
    }
};

// Passo 2: Confirmar código
export const verificarCodigo = async (req, res) => {
    try {
        const { email, codigo} = req.body;

        const cliente = await Cliente.findOne({ email });
        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });

        if (
            cliente.resetCode != codigo ||
            cliente.resetCodeExpire < Date.now()
        ) {
            return res.status(400).json({ message: "Código inválido ou expirado" });
        }

        res.json({ message: "Código verificado com sucesso!" });

    } catch (err) {
        res.status(500).json({ message: "Erro ao verificar código", error: err.message });
    }
}; 

// Passo 3: Redefinir password
export const redefinirPassword = async (req, res) => {
    try {
        const { email, novaPassword } = req.body;

        if (!email || !novaPassword) {
            return res.status(400).json({ message: "Email e nova password são obrigatórios." });
        }

        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        // Encriptar password antes de salvar
        const hashed = await bcrypt.hash(novaPassword, 10);
        cliente.password = hashed;

        // Limpar o código para não ser reutilizado
        cliente.resetCode = undefined;
        cliente.resetCodeExpire = undefined;

        await cliente.save();

        return res.json({ message: "Password redefinida com sucesso!" });
    
    } catch (err) {
        return res.status(500).json({ message: "Erro ao alterar password", error: err.message });
    }

};