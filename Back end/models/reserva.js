class Reserva {
  constructor(id, clienteId, carroId, dataInicio, dataFim, estado_reserva = 'Pendente Pagamento') {
    this.id = id;
    this.clienteId = clienteId;
    this.carroId = carroId;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.estado_reserva = estado_reserva;
  }
}

module.exports = Reserva;
