// src/pages/Cadastro/Cadastro.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cadastro.module.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    console.log('Cadastro attempt:', formData);
    // Após cadastro bem-sucedido:
    navigate('/agendamento');
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroCard}>
        <div className={styles.cadastroHeader}>
          <h1>Crie sua conta</h1>
          <p>Junte-se à família Pet Hero</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.cadastroForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Crie uma senha segura"
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

          <div className={styles.inputGroup}>
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite novamente sua senha"
              required
            />
          </div>

          <div className={styles.terms}>
            <label className={styles.termsLabel}>
              <input type="checkbox" required />
              <span>Concordo com os <Link to="/termos">Termos de Serviço</Link> e <Link to="/privacidade">Política de Privacidade</Link></span>
            </label>
          </div>

          <button type="submit" className={styles.cadastroButton}>
            Criar conta
          </button>
        </form>

        <div className={styles.loginLink}>
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;