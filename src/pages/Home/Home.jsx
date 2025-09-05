// src/pages/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Botao from '../../components/Botao/Botao';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <span className={styles.preTitle}>Cuidado Premium para Seu Pet</span>
            <h1 className={styles.mainTitle}>
              <span className={styles.titleLine}>Seu Pet Merece o</span>
              <span className={styles.titleHighlight}>Melhor Cuidado</span>
            </h1>
            <p className={styles.heroDescription}>
              Na Pet Hero, oferecemos serviços premium de banho, tosa, cuidados veterinários 
              e hospedagem para seu companheiro. Tecnologia avançada e amor pelos animais 
              em cada detalhe.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/login">
                <Botao text="Agendar Serviço" variant="primary" />
              </Link>
              <Link to="/login">
                <Botao text="Ver Serviços" variant="secondary" />
              </Link>
            </div>
          </div>
          <div className={styles.flipCard}>
  <div className={styles.cardInner}>
    <div className={styles.cardFront}>
      <div className={styles.cardImageContainer}>
        // Alternativa ainda mais profissional:

<img 
  src="https://images.unsplash.com/photo-1577720643272-265f0936742f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
  alt="Clínica veterinária moderna" 
  className={styles.cardImage}
/>
        <div className={styles.cardOverlay}></div>
      </div>
      <h3>Conheça Nossa Estrutura</h3>
      <p>Clique para ver mais</p>
    </div>
    <div className={styles.cardBack}>
      <h3>Estrutura de Primeira</h3>
      <p>Ambientes climatizados, equipamentos modernos e espaços projetados para o conforto do seu pet</p>
      <div className={styles.cardStats}>
        <span>500m² de Área</span>
        <span>24h Monitoramento</span>
      </div>

    </div>
  </div>

              
           
          </div>
        </div>
        
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>2,500+</span>
            </div>
            <span className={styles.statLabel}>Pets Atendidos</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>98%</span>
            </div>
            <span className={styles.statLabel}>Satisfação</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>15</span>
            </div>
            <span className={styles.statLabel}>Profissionais</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>24/7</span>
            </div>
            <span className={styles.statLabel}>Disponibilidade</span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nossos Serviços Premium</h2>
          <p className={styles.sectionSubtitle}>Cuidados especializados para cada necessidade do seu pet</p>
        </div>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconContainer}>
              <div className={styles.serviceIcon}>🚿</div>
            </div>
            <h3>Banho & Tosa</h3>
            <p>Banho relaxante, tosa especializada e cuidados estéticos profissionais</p>
            <Link to="/login" className={styles.serviceLink}>
              <span>Saiba mais</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconContainer}>
              <div className={styles.serviceIcon}>🏥</div>
            </div>
            <h3>Veterinário</h3>
            <p>Consultas, vacinas e tratamentos com especialistas qualificados</p>
            <Link to="/login" className={styles.serviceLink}>
              <span>Saiba mais</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconContainer}>
              <div className={styles.serviceIcon}>🏨</div>
            </div>
            <h3>Hospedagem</h3>
            <p>Hotel 5 estrelas com monitoramento 24h e muito conforto</p>
            <Link to="/login" className={styles.serviceLink}>
              <span>Saiba mais</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Text Left and Flip Image Right */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresTextContent}>
            <h2 className={styles.sectionTitle}>Por que escolher a Pet Hero?</h2>
            <p className={styles.sectionSubtitle}>Descubra os diferenciais que nos tornam referência em cuidado animal</p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureTextItem}>
                <div className={styles.featureIcon}>⭐</div>
                <div>
                  <h3>Profissionais Certificados</h3>
                  <p>Nossa equipe possui certificações internacionais em cuidado animal e treinamento contínuo</p>
                </div>
              </div>
              
              <div className={styles.featureTextItem}>
                <div className={styles.featureIcon}>🔬</div>
                <div>
                  <h3>Tecnologia Avançada</h3>
                  <p>Utilizamos equipamentos de última geração para diagnóstico preciso e tratamentos eficazes</p>
                </div>
              </div>
              
              <div className={styles.featureTextItem}>
                <div className={styles.featureIcon}>🌿</div>
                <div>
                  <h3>Produtos Naturais</h3>
                  <p>Shampoos e produtos hipoalergênicos, sustentáveis e testados dermatologicamente</p>
                </div>
              </div>
              
              <div className={styles.featureTextItem}>
                <div className={styles.featureIcon}>🚗</div>
                <div>
                  <h3>Busca e Entrega</h3>
                  <p>Serviço de taxi dog para sua comodidade, com motoristas treinados no transporte animal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.featuresImageContent}>
            <div className={styles.flipCard}>
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.cardIcon}>🐕</div>
                  <h3>Conheça Nossa Estrutura</h3>
                  <p>Clique para ver mais</p>
                </div>
                <div className={styles.cardBack}>
                  <h3>Estrutura de Primeira</h3>
                  <p>Ambientes climatizados, equipamentos modernos e espaços projetados para o conforto do seu pet</p>
                  <div className={styles.cardStats}>
                    <span>500m² de Área</span>
                    <span>24h Monitoramento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Pronto para dar o melhor para seu pet?</h2>
          <p>Agende agora mesmo uma experiência premium de cuidado animal</p>
          <div className={styles.ctaButtons}>
            <Link to="/login">
              <button className={styles.ctaButtonPrimary}>
                <span>Agendar Agora</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Link>
            <Link to="/contato">
              <button className={styles.ctaButtonSecondary}>
                <span>Falar com Consultor</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;