// src/components/Navbar/Navbar.js
import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <a href="/" className={styles.logo}>PetHero</a>
        <ul className={styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/contato">Contato</a></li>
          <li><a href="/agendamento">Agendamento</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;