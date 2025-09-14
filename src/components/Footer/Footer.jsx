// src/components/Footer/Footer.js
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>PetSafe</h3>
            <p>Cuidando do seu pet com amor e dedicação.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Contato</h3>
            <p>Email: contato@petsafe.com</p>
            <p>Telefone: (11) 99999-9999</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Links Rápidos</h3>
            <a href="/planos">Planos</a>
            <a href="/sobre">Sobre Nós</a>
            <a href="/agendamento">Agendamento</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 PetHero. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;