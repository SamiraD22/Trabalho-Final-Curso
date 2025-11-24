import React, { useState, useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import background from "../assets/images/prado.webp";

function VerifyCodePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const emailFromUrl = searchParams.get("email") || "";

    const [email, setEmail] = useState(emailFromUrl);
    const [codigo, setCodigo] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [emailFromUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("");

        try {
            const res = await fetch("http://localhost:5000/api/password/verificar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, codigo }),
            });

            const data = await res.json();

            if (res.ok) {
                setMensagem("Código verificado com sucesso!");
                setTimeout(() => {
                    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
                }, 1500);
            } else {
                setMensagem(data.message || "Código inválido ou expirado.");
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
        <h2>Confirmar Código</h2>

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
            <label>Código recebido</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ex: 123456"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login" style={{ width: "100%" }}>
            Verificar código
          </button>
        </form>

        {mensagem && <p style={{ marginTop: 15 }}>{mensagem}</p>}
      </div>
    </div>
  );
}


export default VerifyCodePage;