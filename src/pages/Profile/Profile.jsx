// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUsuarios } from '../../hooks/useApi';
import styles from './Profile.module.css';
import Button from '../../components/Botao/Botao';

const Profile = () => {
  
  const { currentUser, logout } = useAuth();
  const { updateItem } = useUsuarios();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    endereco: '',
    petName: '',
    petType: '',
    petBreed: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Cores estilo Netflix para o avatar
  const netflixColors = [
    '#E50914', '#221F1F', '#0071EB', '#5D3FD3', 
    '#FF6B00', '#00A8A8', '#C0C0C0', '#8B4513'
  ];

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        telefone: currentUser.telefone || '',
        endereco: currentUser.endereco || '',
        petName: currentUser.petName || '',
        petType: currentUser.petType || '',
        petBreed: currentUser.petBreed || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
  logout();
  // Opcional: redirecionar para home após logout
  window.location.href = '/';
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Atualizar usuário no localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(user => 
        user.id === currentUser.id 
          ? { ...user, ...formData }
          : user
      );
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Atualizar currentUser
      const updatedUser = updatedUsers.find(u => u.id === currentUser.id);
      const { password, ...userWithoutPassword } = updatedUser;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      // Forçar atualização do contexto
      window.location.reload();
      
      setMessage('Perfil atualizado com sucesso!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      setMessage('Erro ao atualizar perfil');
      setMessageType('error');
    }
    
    setLoading(false);
  };

  // Gerar avatar estilo Netflix
  const getNetflixAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    const colorIndex = name ? name.charCodeAt(0) % netflixColors.length : 0;
    
    return (
      <div 
        className={styles.netflixAvatar}
        style={{ backgroundColor: netflixColors[colorIndex] }}
      >
        {initial}
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Área Restrita</h1>
            <p>Faça login para acessar seu perfil</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais e do seu pet</p>
        </div>

        {message && (
          <div className={`${styles.message} ${styles[messageType]}`}>
            {message}
          </div>
        )}

        <div className={styles.profileHeader}>
          {getNetflixAvatar(currentUser.name)}
          <div className={styles.userInfo}>
            <h2>{currentUser.name}</h2>
            <p>{currentUser.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h3>📋 Informações Pessoais</h3>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Endereço</label>
                <textarea
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Seu endereço completo"
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>🐾 Informações do Pet</h3>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Nome do Pet</label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="Ex: Rex, Luna"
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Tipo do Pet</label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Raça</label>
                <input
                  type="text"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  placeholder="Ex: Golden Retriever, Siamesa"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className={styles.profileHeader}>
          {getNetflixAvatar(currentUser.name)}
          <div className={styles.userInfo}>
            <h2>{currentUser.name}</h2>
            <p>{currentUser.email}</p>
          </div>
          <Button 
            variant="secondary" 
            onClick={handleLogout}
            className={styles.logoutButton}
            text='Sair'
          >
            🚪 Sair
          </Button>
        </div>

          <div className={styles.formActions}>
            <Button 
              type="submit" 
              disabled={loading}
              className={styles.saveButton}
              text={'Salvar Alterações'}
            >
              {loading ? '💾 Salvando...' : '💾 Salvar Alterações'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;