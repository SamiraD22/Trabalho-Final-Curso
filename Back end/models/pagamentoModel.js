import mongoose from "mongoose";


const pagamentoSchema = new mongoose.Schema (
    {
        reserva: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reserva",
            required: true,
        },

        metodo_pagamento: {
            type: String,
            enum: [ "cartao_credito", "dinheiro", "transferencia_bancaria" ],
            required: true,
        },

        valor_pago: {
            type: Number,
            required: true,
        },

        data_pagamento: {
            type: Date,
            default: Date.now,
        }
    },

    { timestamps: true}
);

const Pagamento = mongoose.model("Pagamento", pagamentoSchema);


export default Pagamento;