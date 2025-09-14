import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Cadastro.module.css';
import Button from '../../components/Botao/Botao';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

    const formatPhoneNumber = (value) => {
    
    const numbers = value.replace(/\D/g, '');
    
   
    const limitedNumbers = numbers.slice(0, 11);
    
    
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

  if (name === 'telefone') {
      // Aplica máscara para telefone
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Dados do formulário:', formData);

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email inválido');
      return;
    }

    // Validação do telefone (opcional, mas deve ter 11 dígitos se preenchido)
    if (formData.telefone && formData.telefone.replace(/\D/g, '').length !== 11) {
      setError('Telefone deve ter 11 dígitos (DDD + número)');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Remover confirmPassword e formatar telefone (apenas números)
      const { confirmPassword, ...userData } = formData;
      const userDataToSave = {
        ...userData,
        telefone: userData.telefone.replace(/\D/g, '') // Remove não-dígitos
      };
      
      console.log('Dados para registro:', userDataToSave);
      
      // Chamar função de registro
      const result = await register(userDataToSave);
      console.log('Resultado do registro:', result);
      
      if (result && result.success) {
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      } else {
        setError(result?.message || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setError('Falha ao criar conta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Criar Conta</h1>
          <p>Preencha os dados para se cadastrar</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha *</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirmar Senha *</label>
            <div className={styles.passwordInput}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </form>

        <div className={styles.loginLink}>
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}