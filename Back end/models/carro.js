class Carro {
  constructor(id_carro, marca, modelo, numero_matricula, preco_por_dia, ano, cor, numero_portas, tipo_combustivel, categoria, disponivel = true) {
    this.id_carro = id_carro;  // id_carro(PK)
    this.marca = marca;
    this.modelo = modelo;
    this.numero_matricula = numero_matricula;
    this.preco_por_dia = preco_por_dia;
    this.ano = ano;
    this.cor = cor;
    this.numero_portas = numero_portas;
    this.tipo_combustivel = tipo_combustivel;
    this.categoria = categoria;
    this.disponivel = disponivel;
  }

  reservar(){
    this.disponivel = false;
    console.log('Carro ${this.modelo} (${this.matricula}) reservado.');
  }

  estarDisponivel(){
    return this.disponivel;
  }

  //Metodo para tornar o carro disponivel novamente apos a devolucao
  tornarDisponivel(){
    this.disponivel = true;
    console.log('Carro ${this.modelo} (${this.matricula}) agora esta disponivel.');
  }
}

module.exports = Carro;
