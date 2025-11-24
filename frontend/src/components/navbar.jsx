// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
    return (
        <nav className="flex justify-between items-center py-3 px-10 bg-white shadow-md">
          {/* Logo + Links juntos à esquerda */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="RentalCar CV" className="h-14 w-auto" /> {/* Logo maior */}
            </div>

            <ul className="flex items-center gap-6 font-medium text-gray-700">
                <li><Link to='/' className="hover:text-blue-600"> Início </Link></li>
                <li><Link to='/Marcas' className="hover:text-blue-600"> Marcas </Link></li>
                <li><Link to='/Sobre' className="hover:text-blue-600"> Sobre Nós </Link></li>
                <li><Link to='/Contacto' className="hover:text-blue-600"> Contacto </Link></li>
            </ul>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to='/login' className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"> Login </Link>
            <Link
              to='/register'
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Registar
            </Link>
          </div>
        </nav>
    );
}

export default Navbar;