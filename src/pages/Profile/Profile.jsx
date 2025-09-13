import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Profile.module.css';
import Button from '../../components/Botao/Botao';


const Profile = () => {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    displayName: '',
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
        displayName: currentUser.displayName || '',
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
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Aqui você implementaria a atualização no Firebase
      setTimeout(() => {
        setMessage('Perfil atualizado com sucesso!');
        setMessageType('success');
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setMessage('Erro ao atualizar perfil: ' + error.message);
      setMessageType('error');
      setLoading(false);
    }
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

  // Conteúdo do tooltip
  const getUserStatusTooltip = () => {
    const memberSince = currentUser.metadata?.creationTime 
      ? new Date(currentUser.metadata.creationTime).toLocaleDateString('pt-BR')
      : 'Data não disponível';
    
    return (
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipItem}>
          <strong>Membro desde:</strong> {memberSince}
        </div>
        <div className={styles.tooltipItem}>
          <strong>Email verificado:</strong> {currentUser.emailVerified ? '✅ Sim' : '❌ Não'}
        </div>
        <div className={styles.tooltipItem}>
          <strong>ID:</strong> <span className={styles.userId}>{currentUser.uid.slice(0, 8)}...</span>
        </div>
        {currentUser.petName && (
          <div className={styles.tooltipItem}>
            <strong>Pet:</strong> {currentUser.petName}
          </div>
        )}
      </div>
    );
  };


        return (
          <div className={styles.tabContent}>
            <div className={styles.formSection}>
              <h3>📋 Informações Pessoais</h3>
              
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
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
                    disabled
                    className={styles.disabledInput}
                  />
                  <small className={styles.helpText}>Email não pode ser alterado</small>
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

            <div className={styles.formActions}>
              <Button 
                type="submit" 
                disabled={loading}
                className={styles.saveButton}
              >
                {loading ? '💾 Salvando...' : '💾 Salvar Alterações'}
              </Button>
            </div>
          </div>
        );

      // ... outros casos de abas (mantenha os existentes)
    }

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
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <ProfileMenu 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>Meu Perfil</h1>
            <p>Gerencie suas informações pessoais e configurações</p>
          </div>

          {message && (
            <div className={`${styles.message} ${styles[messageType]}`}>
              {message}
            </div>
          )}

          <div className={styles.profileHeader}>
            {getNetflixAvatar(currentUser.displayName || currentUser.email)}
            <div className={styles.userInfo}>
              <Tooltip 
                content={getUserStatusTooltip()}
                position="bottom"
              >
                <h2 className={styles.userName}>
                  {currentUser.displayName || currentUser.email}
                </h2>
              </Tooltip>
              <p>{currentUser.email}</p>
            </div>
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              🚪 Sair
            </Button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {renderTabContent()}
          </form>
        </div>
      </main>
    </div>
  );


export default Profile;