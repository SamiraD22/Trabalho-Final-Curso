import Car from "../models/carModel.js";


// Criar um novo carro
export const createCar = async (req, res) => {
  try {
    const {
      marca,
      modelo,
      numero_matricula,
      preco_por_dia,
      ano,
      cor,
      numero_portas,
      tipo_combustivel,
      categoria,
      disponivel,
    } = req.body;

    // Verificar se matricula já existe
    const existingCar = await Car.findOne ({ numero_matricula });
    if (existingCar) {
      return res.status(400).json({ message: "Já existe um carro com essa matrícula." });
    }

    const newCar = await Car.create ({
      marca,
      modelo,
      numero_matricula,
      preco_por_dia,
      ano,
      cor,
      numero_portas,
      tipo_combustivel,
      categoria,
      disponivel,
    });

    res.status(201).json ({
      message: "Carro criado com sucesso!",
      car: newCar,
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar Carro", error: error.message });
  }
};


// Listar todos os carros
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar carros", error: error.message });
  }
};


// Obter um carro por ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar carro", error: error.message });
  }
};


// Atualizar um carro
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    });

    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }

    res.status(200).json({ 
      message: "Carro atualizado com sucesso!",
      car, 
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar carro", error: error.message });
  }
};


// Eliminar um carro
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete (req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado "});
    }
    res.status(200).json({ message: "Carro eliminado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao eliminar carro", error: error.message });
  }
};
