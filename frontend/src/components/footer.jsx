//src/components/footer.jsx

import React from "react";
import logo from "../assets/images/logo.png";

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-10 px-10">
            <div className="grid md-grid-cols-3 gap-10">
                <div>
                    <img src={logo} alt="RentalCar CV" className="h-8 mb-3" />
                    <p className="text-sm">
                        Aluguer de carros simples e rápido. Reserve o seu veículo ideal e explore Cabo Verde em conforto.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-3"> Sobre Nós </h4>
                    <ul className="text-sm space-y-2">
                        <li> Quem Somos </li>
                        <li> Suporte </li>
                        <li> Tremos e Condições </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3"> Receba Atualizações </h4>
                    <input
                      type="email"
                      placeholder="Digite sem email"
                      className="p-2 rounded-md text-black w-full" 
                    />
                </div>
            </div>

            <p className="text-center text-sm mt-10">
                 © 2025 RentalCar CV — Todos os direitos reservados.
            </p>
        </footer>
    );
}


export default Footer;