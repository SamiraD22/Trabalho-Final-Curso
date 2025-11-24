// app.js (no seu diretório de backend)

const express = require('express');
const app = express();
const cors = require('cors'); // Importe o pacote cors
const { Pool } = require('pg');

// Instale o pacote 'cors' se ainda não o fez no seu backend: npm install cors

// --- Middleware CORS ---
// Use o middleware CORS antes de suas rotas para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:5173' // Permite requisições apenas do seu frontend React
    // Se você quiser permitir de qualquer origem durante o desenvolvimento (NÃO RECOMENDADO EM PRODUÇÃO):
    // origin: '*'
}));

// --- Middlewares para parsing do corpo da requisição ---
app.use(express.json()); // Para parsing de JSON no corpo das requisições (req.body)
app.use(express.urlencoded({ extended: true })); // Para parsing de URL-encoded bodies (formulários HTML)

// --- Rota de Login ---
// Esta rota ira lidar com os pedidos POST para '/api/login'
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Simulação de verificação de credenciais
    // Numa aplicação real, você iria consultar uma base de dados
    console.log('Tentativa de login com:', email, password);

    if (email === 'teste@teste.com' && password === '123') {
    res.status(200).json({ message: 'Login bem-sucedido!', token: 'um_token_de_autenticacao' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


// --- Importação das Rotas ---
// Certifique-se de que os caminhos para suas rotas estão corretos
const clientesRoutes = require('./routes/clientesRoutes');
const carrosRoutes = require('./routes/carrosRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');

// --- Uso das Rotas ---
// Associe as rotas aos seus respectivos caminhos base da API
app.use('/api/clientes', clientesRoutes); // Ex: GET /clientes
app.use('/api/carros', carrosRoutes);     // Ex: GET /carros, POST /carros
app.use('/api/reservas', reservasRoutes); // Ex: POST /reservas
app.use('/api/pagamentos', pagamentoRoutes); // Ex: POST /pagamento

// --- Rota Raiz (Opcional, apenas para testar se o servidor está online) ---
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Aluguer de Carros! Acesse as rotas como /clientes, /carros, etc.');
});

// --- Início do Servidor ---
const PORT = 3001; // Define a porta do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
    console.log('Agora você pode interagir com a API.');
});

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'aluguer_carros',
    password: 'liberdade22',
    port: 5432,
});