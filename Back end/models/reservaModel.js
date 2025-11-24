import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema (
    {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente",
            required: true,
        },

        carro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            required: true,
        },

        data_inicio: {
            type: Date,
            required: true,
        },

        data_fim: {
            type: Date,
            required: true,
        },

        preco_total: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pendente", "confirmado", "cancelada"],
            default: "pendente",
        },
    },

    { timestamps: true }
);

const Reserva = mongoose.model("Reserva", reservaSchema);



export default Reserva;