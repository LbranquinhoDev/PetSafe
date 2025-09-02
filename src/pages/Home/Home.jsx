import React, { use } from 'react';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';

export const Home = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <div className={styles.home}>
  <header className={`${styles.hero} ${animate ? styles.active : ''}`}>
    <h1>PetSafe</h1>
    <p>Serviços personalizados para quem ama pets mas tem pouco tempo</p>
    <a href="" className={styles.cta}>
      Conheça nossos serviços
    </a>
  </header>



    <section className={styles.benefits}>
        
  <h2>Por que escolher a PetSafe?</h2>
  <div className={styles.cards}>
    <div className={styles.card + ' ' + (animate ? styles.active : '')}>
      <h3>Agendamento Flexível</h3>
      <p>Você escolhe o horário, nós cuidamos do resto.</p>
    </div>
    <div className={styles.card + ' ' + (animate ? styles.active : '')}>
      <h3>Equipe Especializada</h3>
      <p>Profissionais apaixonados por pets.</p>
    </div>
    <div className={styles.card + ' ' + (animate ? styles.active : '')}>
      <h3>Atendimento Rápido</h3>
      <p>Serviços eficientes sem perder a qualidade.</p>
    </div>
  </div>
</section>

<section id="servicos" className={styles.services + ' ' + (animate ? styles.active : '')}>
  <h2>Serviços</h2>
  <ul>
    <li>Banho & Tosa</li>
    <li>Passeios agendados</li>
    <li>Consultas veterinárias</li>
    <li>Entrega de produtos pet</li>
  </ul>
</section>

      <footer className={styles.footer}>
        <p>© 2025 PetSafe. Todos os direitos reservados.</p>
        <p>Contato: contato@petsafe.com.br</p>
      </footer>
    </div>
  );
}
export default Home;