import React from 'react';
import LayoutPadrao from '../../components/LayoutPadrao';
import styles from './Servicos.module.css';

const Servicos = () => {
  return (
    <LayoutPadrao>
      <div className={styles.servicosHeader}>
        <h1>Nossos Serviços</h1>
        <p>Oferecemos uma variedade de serviços para manter seu pet saudável e feliz</p>
      </div>

      <section className={styles.servicosLista}>
        <div className={styles.servicoItem}>
          <div className={styles.servicoImagem}>
            <img src="/images/banho-tosa-detalhe.jpg" alt="Banho e Tosa" />
          </div>
          <div className={styles.servicoConteudo}>
            <h2>Banho e Tosa</h2>
            <p>Oferecemos serviços completos de banho e tosa com produtos de alta qualidade e profissionais especializados.</p>
            <ul>
              <li>Banho higiênico e terapêutico</li>
              <li>Tosa na máquina e tesoura</li>
              <li>Hidratação</li>
              <li>Limpeza de ouvidos e corte de unhas</li>
            </ul>
            <button className={styles.servicoBtn}>Agendar agora</button>
          </div>
        </div>

        <div className={`${styles.servicoItem} ${styles.reverse}`}>
          <div className={styles.servicoImagem}>
            <img src="/images/veterinario-detalhe.jpg" alt="Serviços Veterinários" />
          </div>
          <div className={styles.servicoConteudo}>
            <h2>Consultas Veterinárias</h2>
            <p>Cuide da saúde do seu pet com nossos veterinários especializados e equipamentos modernos.</p>
            <ul>
              <li>Consulta de rotina</li>
              <li>Vacinação</li>
              <li>Exames laboratoriais</li>
              <li>Microchipagem</li>
            </ul>
            <button className={styles.servicoBtn}>Agendar agora</button>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Pronto para agendar um serviço?</h2>
        <p>Escolha o serviço desejado, selecione data e horário e deixe o resto conosco!</p>
        <button className={styles.ctaBtn}>Fazer agendamento</button>
      </section>
    </LayoutPadrao>
  );
};

export default Servicos;