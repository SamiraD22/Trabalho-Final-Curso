import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import background from "../assets/images/prado.webp";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [novaPassword, setNovaPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (novaPassword !== confirmar) {
      return setMensagem("As passwords não coincidem.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/password/redefinir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, novaPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Password alterada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMensagem(data.message || "Erro ao redefinir password.");
      }
    } catch (err) {
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-card">
        <h2>Redefinir Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Nova password</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="********"
                value={novaPassword}
                onChange={(e) => setNovaPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar nova password</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="********"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login" style={{ width: "100%" }}>
            Guardar nova password
          </button>
        </form>

        {mensagem && <p style={{ marginTop: 15 }}>{mensagem}</p>}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
