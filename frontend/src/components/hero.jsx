
import React from "react";
//import Navbar from "../components/navbar";
//import Features from "../components/features";
import heroCars from "../assets/images/merged.png";

function Hero() {
    return (
        <div className="bg-gray-50 flex flex-col">
          <section className="flex flex-col md:flex-row items-center justify-between py-8 px-10 bg-gray-50">
            <div className="md:w-1/2 text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                    Explore Cabo Verde com a {" "} 
                    <span className="text-orange-500"> RentalCar CV </span>
                </h1>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    Encontre o carro ideal para a sua viagem em Cabo Verde
                    <br />
                    Com poucos cliques, reserve o seu veículo e parta tranquilo!
                </p>
            </div>

            <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
                <img
                  src={heroCars}
                  alt="Carros em Destaque" 
                  className="w-[70%] md:w-[420px] lg:w-[480px] xl:w-[500px]" 
                />
            </div>
          </section>
        </div>
    );
}


export default Hero;