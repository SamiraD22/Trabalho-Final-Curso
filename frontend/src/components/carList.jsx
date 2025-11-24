
import React from "react";
import car1 from "../assets/images/honda civic.jpg";
import car2 from "../assets/images/toyota hiace.png";
import car3 from "../assets/images/hyunday creta.webp";
import car4 from "../assets/images/jeep renegade.jpg";

function CarList() {
    const cars =[
        {name: "Honda Civic", img: car1 },
        {name: "Toyota Corolla", img: car2 },
        {name: "Hyunday Creta", img: car3  },
        {name: "Jeep Renegade", img: car4  },
    ];


    return (
        <section className="py-20 text-center bg-white  ">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
                Carros Presentes
                <p className="text-gray-500 mb-6"> Alguns dos modelos mais alugados </p>
            </h2>
            
            <div className="flex justify-center gap-10 flex-wrap">
                {cars.map((car, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-2xl p-5 w-64 hover:shadow-2xl transition-all transform hover:-translate-y-1"
                  >
                    <img
                      src={car.img}
                      alt={car.name}
                      className="rounded-lg mb-4 w-full h-40 object-cover"
                      />
                      
                      <h3 className="font-semibold text-lg text-gray-700">{car.name}</h3>
                      <p className="text-orange-600 font-medium mt-1">{car.price}</p>
                    
                    </div>
        ))}
      </div>
    </section>
  );
}


export default CarList;