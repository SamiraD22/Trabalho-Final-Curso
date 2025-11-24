import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Cliente from "../models/clienteModel.js";


// Função para gerar token
const generateToken = (id, email) => {
  return jwt.sign (
    { id, email },
    process.env.JWT_SECRET || "supersegredo123",
    { expiresIn: "30d" }
  );
};

// Registrar cliente
export async function registerUser(req, res) {
  try {
    const { nome, email, telefone, endereco, documento_identificacao, password } = req.body;

    // Verifica campos obrigatórios
    if (!nome || !email || !password) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos obrigatórios" });
    }

    // Verifica se já existe utilizador com o mesmo e-mail
    const emailExists = await Cliente.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já registado" });
    }

    // Verifica se já existe utilizador com o mesmo numero identificacao
    const docExists = await Cliente.findOne({ documento_identificacao });
    if (docExists) {
      return res.status(400).json({ message: "Documento de identificação já registrado." });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo cliente
    const novoCliente = await Cliente.create({
      nome,
      email,
      telefone,
      endereco,
      documento_identificacao,
      password: hashedPassword, 
    });

    // Gera o token
    const token = generateToken(novoCliente._id, novoCliente.email);

    // Retorna a resposta com o token
    res.status(201).json ({
      message: "Cliente registado com sucesso",
      Cliente: {
        _id: novoCliente._id,
        nome: novoCliente.nome,
        email: novoCliente.email,
        telefone: novoCliente.telefone,
        endereco: novoCliente.endereco,
        documento_identificacao: novoCliente.documento_identificacao,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao registar utilizador", error });
  }
}

// Login do cliente
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(401).json({ message: "Usuário não encontrado "});
    }

    // Compara senha fornecida com a armazenada
    const PasswordValida = await bcrypt.compare(password, cliente.password);
    if (!PasswordValida)
      return res.status(401).json({ message: "Senha incorreta" });

    // Gera novo token JWT
    const token = generateToken(cliente._id, cliente.email);

    res.json({
      message: "Login efectuado com sucesso",
      token,
      cliente: {
        id: cliente._id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
        documento_identificacao: cliente.documento_identificacao
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Erro no login", error: error.message });
  }
};

// Atualizar perfil (protegido)
export const updateProfile = async (req, res) => {
  try {
    // req.user deve estar preenchido pelo middleware protect
    const cliente = await Cliente.findById(req.cliente._id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
  }

    const { nome, email, telefone, endereco, documento_identificacao, password } = req.body;

    // Verificar se email já pertence a outro cliente
    if (email && email !== cliente.email) {
      const emailExists = await Cliente.findOne({ email });
      if(emailExists) {
        return res.status(400).json({ message: "Este email já está em uso por outro utilizador." });
      }
      cliente.email = email;
    }

    // Verificar documento duplicado
    if (documento_identificacao && documento_identificacao !== cliente.documento_identificacao) {
      const docExists = await Cliente.findOne({ documento_identificacao });
      if (docExists) {
        return res.status(400).json({ message: "Documento de identificação já esta em uso." });
      }
      cliente.documento_identificacao = documento_identificacao;
    }

    if (nome) cliente.nome = nome;
    if (telefone) cliente.telefone = telefone;
    if (endereco) cliente.endereco = endereco;

    if (password) {
      cliente.password = await bcrypt.hash(password, 10);
    }

    const clienteAtualizado = await cliente.save();


    res.json ({
      message: "Perfil atualizado com sucesso",
      cliente: {
        _id: clienteAtualizado._id,
        nome: clienteAtualizado.nome,
        email: clienteAtualizado.email,
        telefone: clienteAtualizado.telefone,
        endereco: clienteAtualizado.endereco,
        documento_identificacao: clienteAtualizado.documento_identificacao,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil", error: error.message });
  }
};

// Passo 1: Enviar código de recuperção
export const enviarCodigoReset = async (req, res) => {
  try {
    const { email } = req.body;

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ message: "Nenhuma conta encontrada com este email."});
    }

    // Gerar código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);

    cliente.resetCode = codigo;
    cliente.resetCodeExpire = Date.now() + 10 * 60 * 1000;

    await cliente.save();

    // Simulação de envio por sms
    return res.json({
      message: "Código enviado com sucesso!",
      codigo
    });

  } catch (err) {
    res.status(500).json({ message: "Erro ao gerar código", error: err.message });
  }
};

// Passo 2: Verificar código
export const verificarCodigoReset = async (req, res) => {
  try {
    const { email, codigo } = req.body;

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    if (
      cliente.resetCode != codigo ||
      cliente.resetCodeExpire < Date.now()
    ) {
      return res.status(400).json({ message: "Código inválido ou expirado" });
    }

    res.json({ message: "Código verificado com sucesso!" });

  } catch (err) {
    res.status(500).json({ message: "Erro ao validar código", error: err.message });
  }
};

// Passo 3: Redefinir password
export const redefinirPassword = async (req, res) => {
  try {
    const { email, novaPassword } = req.body;

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Atualizar password com hash
    cliente.password = await bcrypt.hash(novaPassword, 10);

    // Limpar código
    cliente.resetCode = undefined;
    cliente.resetCodeExpire = undefined;

    await cliente.save();

    res.json({ message: "Password redefinida com sucesso!" });

  } catch (err) {
    res.status(500).json({ message: "Erro ao alterar password", error: err.message });
  }
};
  
