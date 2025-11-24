import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import background from "../assets/images/prado.webp";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [codigo, setCodigo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("");
        setCodigo("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMensagem(data.message || "Código enviado.");
                if (data.codigo) {
                    setCodigo(data.codigo);
                }

                // Ir para página de verificação de código, passando o email
                setTimeout(() => {
                    navigate(`/verify-code?email=${encodeURIComponent(email)}`);
                }, 1500);

            } else {
                setMensagem(data.message || "Erro ao enviar código.");
            }
        } catch (err) {
            setMensagem("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div
          className="login-container"
          style={{ backgroundImage: `url(${background})`}}
        >
            <div className="login-card">
                <h2> Recuperar Password </h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label> E-mail associado à conta </label>
                        <div className="input-wrapper">
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-login" style={{ width: "100%" }}>
                        Enviar código
                    </button>
                </form>

                {mensagem && <p style={{ marginTop: 15 }}> {mensagem} </p>}

                {codigo && (
                    <p style={{ marginTop: 10, fontSize: "0.9rem" }}>
                        <strong> Código (simulado):</strong> {codigo}
                    </p>
                )}
            </div>
        </div>
    );
}


export default ForgotPasswordPage;