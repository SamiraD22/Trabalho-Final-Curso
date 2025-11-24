import Reserva from "../models/reservaModel.js";
import Car from "../models/carModel.js";
import Cliente from "../models/clienteModel.js";


// Criar nova reserva
export const createReserva = async (req, res) => {
  try {
    const { cliente, carro, data_inicio, data_fim } = req.body;

    // Verificar se cliente existe
    const clienteExists = await Cliente.findById(cliente);
    if (!clienteExists) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Verificar se carro existe
    const carroExists = await Car.findById(carro);
    if (!carroExists) {
      return res.status(404).json({ message: "Carro não encontrado." });
    }

    // Verificar se carro está disponível
    if (!carroExists.disponivel) {
      return res.status(400).json({ message: "Este carro não está disponível." });
    }

    // Calcular número de dias e preço total
    const dias = Math.ceil((new Date(data_fim) - new Date(data_inicio)) / (1000 * 60 * 60 * 24));
    const preco_total = dias * carroExists.preco_por_dia;

    // Criar Reserva
    const novaReserva = await Reserva.create ({
      cliente,
      carro,
      data_inicio,
      data_fim,
      preco_total,
      status: "pendente",
    });

    // Atualizar carro para indisponível
    carroExists.disponivel = false;
    await carroExists.save();

    res.status(201).json ({
      message: "Reserva criada com sucesso!",
      reserva: novaReserva,
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar reserva", error: error.message });
  }
};

// Listar todas as reservas
export const getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("cliente", "nome email telefone")
      .populate("carro", "marca modelo numero_matricula preco_por_dia");
    res.status(200).json(reservas);

  } catch (error) {
    res.status(500).json({ message: "Erro ao listar reservas", error: error.message });
  }
}; 

// Obter reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate("cliente", "nome email telefone")
      .populate("carro", "marca modelo numero_matricula preco_por_dia");
    if (!reserva) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reserva", error: error.message });
  }
};

// Atualizar reserva
export const updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }
    res.status(200).json({ message: "Reserva atualizada com sucesso!", reserva });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar reserva", error: error.message });
  }
};

// Eliminar reserva
export const deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }

    // Repor disponibilidade do carro
    const carro = await Car.findById(reserva.carro);
    if (carro) {
      carro.disponivel = true;
      await carro.save();
    }

    res.status(200).json({ message: "Reserva eliminada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao eliminar reserva", error: error.message });
  }
};