import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "O email é obrigatório"],
      unique: true,
      match: [/.+\@.+\..+/, "Por favor insira um email válido"],
      lowercase: true,
      trim: true,
    },

    telefone: {
      type: String,
      required: [true, "O telefone é obrigatório"],
    },

    endereco: {
      type: String,
      required: [true, "O endereço é obrigatório"],
    },

    documento_identificacao: {
      type: String,
      required: [true, "O documento de identificação é obrigatório"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "O password é obrigatória"],
      minlength: [6, "O password deve ter pelo menos 6 caracteres"],
    },

    resetCode: {
      type: String,
      default: null,
    },

    resetCodeExpire: {
      type: Date,
      default: null,
    },
  },

  { 
    timestamps: true
  }
);


const Cliente = mongoose.model("Cliente", clienteSchema);



export default Cliente;
