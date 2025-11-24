import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './register.css';
import background from "../assets/images/prado.webp";


function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState ({
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        documento_identificacao: "",
        password: "",
        confirmarPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmarPassword) {
            return alert("As passwords não coincidem!");
        }

        try{
            const response = await fetch("http://localhost:5000/api/auth/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Conta criada com sucesso!");
                navigate("/login"); //vai para login após registar
            }
            
            else{
                alert(data.message || "Erro ao criar conta");
            }
        }
        catch (error) {
            alert("Erro ao conectar ao servidor.");
            console.error(error);
        }
    };

    return (
        <div 
          className="register-container"
          style={{ backgroundImage: `url(${background})` }}
          >
            
            <div className="register-card">
                <h2> Criar Conta </h2>

                <form onSubmit={handleSubmit} className="form-grid">
                    {/* EMAIL*/}
                    <div className="input-group">
                        <label> Nome Completo </label>
                        <input
                          type="text"
                          name="nome"
                          placeholder="Seu nome"
                          value={form.nome}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                       />
                    </div>

                    {/* TELEFONE */}
                    <div className="input-group">
                        <label>Telefone</label>
                        <input
                          type="text"
                          name="telefone"
                          placeholder="(+238) 999-9999"
                          value={form.telefone}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    {/* ENDEREÇO */}
                    <div className="input-group">
                        <label>Endereço</label>
                        <input
                          type="text"
                          name="endereco"
                          placeholder="Cidade, Rua, Casa nº"
                          value={form.endereco}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    {/* DOCUMENTO IDENTIFICAÇÃO */}
                    <div className="input-grou form-full">
                        <label>Documento de Identificação</label>
                        <input
                          type="text"
                          name="documento_identificacao"
                          placeholder="BI / Passaporte / Carta"
                          value={form.documento_identificacao}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="input-group">
                        <label> Password </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="********"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    {/* CONFIRMAR PASSWORD */}
                    <div className="input-group">
                        <label>Confirmar Password</label>
                        <input 
                          type="password"
                          name="confirmarPassword"
                          placeholder="********"
                          value={form.confirmarPassword}
                          onChange={handleChange}
                          required
                        />
                    </div>

                    <button className="primary-btn" type="submit">
                         Criar Conta
                    </button>

                    <p className="form-full redirect-text">
                        Já tem conta?
                        <Link to="/login"> Entrar</Link>
                    </p>
                  </form>
                </div>
            </div>
    );
}

export default RegisterPage;