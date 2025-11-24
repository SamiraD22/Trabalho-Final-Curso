import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import background from "../assets/images/prado.webp";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login efetuado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao fazer login: " + data.message);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* FORGOT-PASSWORD */}
          <p className="forgot-password">
            <Link to="/forgot-password"> Esqueceu a password? </Link>
          </p>

          {/* CRIAR CONTA */}
          <p className="sem-conta">Não tem uma conta?</p>

          <Link to="/register" className="btn-criar-conta">
            Criar Conta
          </Link>

          {/* BOTÃO ENTRAR */}
          <button type="submit" className="btn-login">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
