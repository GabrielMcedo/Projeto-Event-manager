import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [gravarSenha, setGravarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((user) => user.email === email && user.senha === senha);
  
    if (usuario) {
      localStorage.setItem('token', 'fake-token');
      navigate('/home');
    } else {
      setErro('Credenciais inválidas');
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p className="error-message">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="checkbox-container">
          <label>Gravar Senha</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={gravarSenha}
              onChange={() => setGravarSenha(!gravarSenha)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <div className="register-link">
        <button onClick={handleNavigateToRegister}>Cadastrar-se</button>
      </div>
    </div>
  );
};

export default Login;
