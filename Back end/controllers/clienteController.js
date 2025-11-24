import Cliente from "../models/clienteModel.js";

// Criar novo cliente
export const createCliente = async (req, res) => {
  try {
    const { nome, email, telefone, endereco, documento_identificacao, senha} = req.body;

    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({ message: "Já existe um cliente com este email." });
    }

    const novoCliente = await Cliente.create ({
      nome,
      email,
      telefone,
      endereco,
      documento_identificacao,
      senha,
    });

    res.status(201).json ({
      message: "Cliente criado com sucesso!",
      cliente: novoCliente,
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar cliente", error: error.message });
  }
};


// Listar todos os clientes
export const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes", error: error.message });
  }
};


// Obter cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar cliente", error: error.message });
  }
};


// Atualizar cliente
export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate (req.params.id, req.body, { new: true});
    if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
    res.status(200).json({ message: "Cliente atualizado com sucesso!", cliente });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar cliente", error: error.message });
  }
};


// Eliminar cliente
export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete (req.params.id);
    if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
    res.status(200).json({ message: "Cliente eliminado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao eliminar cliente", error: error.message });
  }
};
