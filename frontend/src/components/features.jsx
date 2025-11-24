
import React from "react";
import { FaCarSide, FaClipboardList, FaHeadset} from "react-icons/fa";
//import { FaCar} from "react-icons/fa";

function Features() {
    const features = [
        {
            icon: <FaCarSide className="text-orange-500 text-5xl mb-4" />,
            title: "Variedade de Carros",
            description: "Carros para todos os gostos e necessidades."
        },
        {
            icon: <FaClipboardList className="text-orange-500 text-5xl mb-4" />,
            title: "Reservas Simples",
            description: "Sistema fácil e rápido de agendamento.",
        },
        {
            icon: <FaHeadset className="text-orange-500 text-5xl mb-4" />,
            title: "Suporte Local",
            description: "Equipe disponível em todas as ilhas.",
        },
    ];

return (
    <section className="pt-4 pb-14 bg-gradient-to-b from-gray-50 to-orange text-center ">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 tracking-wide">
          Por que escolher a{" "} 
          <span className="text-orange-500">RentalCar CV?</span>
        </h2>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transform transition duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Features;