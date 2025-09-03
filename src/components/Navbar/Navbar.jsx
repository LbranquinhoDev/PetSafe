import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ menuAberto, setMenuAberto }) => {
  const location = useLocation();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.navLogo}>
            <img src="/images/logo-petsafe.png" alt="PetSafe" />
            <span>PetSafe</span>
          </Link>

          <div className={`${styles.navMenu} ${menuAberto ? styles.ativo : ''}`}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.ativo : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              Home
            </Link>
            <Link 
              to="/servicos" 
              className={`${styles.navLink} ${location.pathname === '/servicos' ? styles.ativo : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/sobre" 
              className={`${styles.navLink} ${location.pathname === '/sobre' ? styles.ativo : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className={`${styles.navLink} ${location.pathname === '/contato' ? styles.ativo : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              Contato
            </Link>
            <Link 
              to="/agendamento" 
              className={styles.navCta}
              onClick={() => setMenuAberto(false)}
            >
              Agendar
            </Link>
          </div>

          <div 
            className={`${styles.hamburger} ${menuAberto ? styles.ativo : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;