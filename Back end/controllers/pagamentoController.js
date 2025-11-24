import Pagamento from "../models/pagamentoModel.js";
import Reserva from "../models/reservaModel.js";


export const realizarPagamento = async (req, res) => {
    try {
        const { reservaId, metodo_pagamento } = req.body;

        // Verificar se reserva existe
        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }

        // Criar registo pagamento
        const novoPagamento = await Pagamento.create({
            reserva: reservaId,
            metodo_pagamento,
            valor_pago: reserva.preco_total,
            data_pagamento: new Date(),
        });

        // Atualizar estado da reserva para confirmada
        reserva.status = "confirmado";
        await reserva.save();

        return res.status(201).json({
            message: "Pagamento realizado com sucesso!",
            pagamento: novoPagamento,
        });

    } catch (error) {
        console.error("Erro no pagamento:", error);
        res.status(500).json({
            message: "Erro ao processar pagamento",
            error: error.message,
        });
    }
};