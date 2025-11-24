class Pagamento{
    constructor(id, id_reserva, metodo_pagamento, data_pagamento, montante, status = 'Pendente'){
        this.id = id;
        this.id_reserva = id_reserva;
        this.metodo_pagamento = metodo_pagamento;
        this.data_pagamento = data_pagamento;
        this.montante = montante;
        this.status = status;  //'Pendente', 'Autorizado', 'Recusado', 'Concluido'
    }
}

module.exports = Pagamento;