import mongoose from "mongoose";

const carSchema = new mongoose.Schema (
    {
        marca: {
            type: String,
            required: [true, "A marca do carro é obrigatório"],
        },

        modelo: {
            type: String,
            required: [true, "O modelo do carro é obrigatório"],
        },

        numero_matricula: {
            type: String,
            required: [true, "O número de matrícula é obrigatório"],
            unique: true,
        },

        preco_por_dia: {
            type: Number,
            required: [true, "O preço po dia é obrigatório"],
        },

        ano: {
            type: Number, 
            required: [true, "O ano do carro é obrigatório"],
        },

        cor: {
            type: String,
        },

        numero_portas: {
            type: Number,
        },

        tipo_combustivel: {
            type: String,
        },

        categoria: {
            type: String,
        },

        disponivel: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);


export default Car;