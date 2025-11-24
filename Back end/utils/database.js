const fs = require('fs');
const path = require('path');

// Função para ler dados do ficheiro JSON
function lerDados(ficheiro) {
  const caminho = path.join(__dirname, '..', 'data', ficheiro);
  if (!fs.existsSync(caminho)) return [];
  const dados = fs.readFileSync(caminho, 'utf-8');
  return JSON.parse(dados);
}

// Função para guardar dados no ficheiro JSON
function guardarDados(ficheiro, dados) {
  const caminho = path.join(__dirname, '..', 'data', ficheiro);
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

module.exports = {
  lerDados,
  guardarDados,
};
