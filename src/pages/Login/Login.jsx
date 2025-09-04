// src/pages/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui
    console.log('Login attempt:', { email, password });
    // Após login bem-sucedido:
    navigate('/agendamento');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Bem-vindo de volta!</h1>
          <p>Entre na sua conta para agendar serviços</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <Link to="/esqueci-senha" className={styles.forgotPassword}>
              Esqueci a senha
            </Link>
          </div>

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>

        <div className={styles.loginDivider}>
          <span>ou</span>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.googleButton}>
            <span>🎯</span>
            Entrar com Google
          </button>
          <button className={styles.facebookButton}>
            <span>📘</span>
            Entrar com Facebook
          </button>
        </div>

        <div className={styles.registerLink}>
          <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;