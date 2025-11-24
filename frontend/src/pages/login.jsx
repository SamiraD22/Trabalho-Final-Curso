
import React, { useState } from 'react';
import './Login.css'; // Importa o CSS para este componente
import background from '../assets/images/prado.webp';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados de login:', { email, password });
    // Futuramente, a lógica de chamada à API do backend virá aqui
    alert('Tentativa de login com ' + email);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <a href="#">Não tem uma conta?</a>
            <button type="button" className="secondary-btn">Criar Conta</button>
            <button type="submit" className="primary-btn">ENTRAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;