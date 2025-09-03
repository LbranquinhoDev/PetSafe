import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from './LayoutPadrao.module.css';

const LayoutPadrao = ({ children }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar menuAberto={menuAberto} setMenuAberto={setMenuAberto} />
      <div className={`${styles.overlay} ${menuAberto ? styles.overlayAtivo : ''}`} 
           onClick={() => setMenuAberto(false)}></div>
      <main className={styles.conteudo}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPadrao;