// src/components/LayoutPadrao/LayoutPadrao.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './LayoutPadrao.module.css';

const LayoutPadrao = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.conteudo}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPadrao;