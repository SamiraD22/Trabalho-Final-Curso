
import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Features from "../components/features";
import CarList from "..//components/carList";
import Footer from "../components/footer";

function HomePage() {
  return (
    <>
      {/* Barra de navegação */}
      <Navbar />

      {/* Secão principal (banner com carros) */}
      <div className="bg-gray-50">
        <Hero />
      </div>

      {/*Seção de benefícios */}
      <div className="-mt-10">
        <Features />
      </div>

      {/* Seção com carros disponíveis */}
      <div className="-mt-4">
        <CarList />
      </div>

      {/* Rodapé */}
      <Footer />

    </>
  );
}


export default HomePage;