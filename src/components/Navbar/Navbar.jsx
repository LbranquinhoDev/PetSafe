import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Cores estilo Netflix para os avatares
  const netflixColors = [
    '#E50914', '#221F1F', '#0071EB', '#5D3FD3', 
    '#FF6B00', '#00A8A8', '#C0C0C0', '#8B4513'
  ];

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <span>🐾 PetHero</span>
        </Link>

        <div className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          <Link to="/" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
                   
          <Link to="/sobre" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
            Sobre
          </Link>
          
          <Link to="/planos" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
            Planos
          </Link>

          {currentUser ? (
            // USUÁRIO LOGADO - Menu completo
            <div className={styles.userMenu}>
              <Link to="/agendamento" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
                Agendar
              </Link>
              
              <div className={styles.profileMenu}>
                <div className={styles.profileToggle}>
                  {getNetflixAvatar(currentUser.name)}
                  <span className={styles.userName}>{currentUser.name}</span>
                  <span className={styles.dropdown}>▼</span>
                </div>
                
                <div className={styles.profileDropdown}>
                  <Link to="/profile" className={styles.dropdownItem}>
                    👤 Meu Perfil
                  </Link>
                  <Link to="/meus-agendamentos" className={styles.dropdownItem}>
                    📅 Meus Agendamentos
                  </Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    🚪 Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // USUÁRIO NÃO LOGADO - Menu reduzido
            <div className={styles.authButtons}>
              <Link to="/servicos" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
                Nossos Serviços
              </Link>
              
              <Link to="/sobre" className={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
                Quem Somos
              </Link>
              
              <div className={styles.authSection}>
                <Link to="/login" className={styles.loginButton} onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/cadastro" className={styles.signupButton} onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </div>
            </div>
          )}
        </div>

        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;