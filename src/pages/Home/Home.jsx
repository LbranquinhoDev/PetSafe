import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';
import Botao from '../../components/Botao/Botao';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { currentUser } = useAuth();
  
  const heroImages = [
    "https://images.unsplash.com/photo-1577720643272-265f0936742f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1551144608-9b034ccdf98d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section Dinâmica */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div 
            className={styles.heroImage}
            style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
          ></div>
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            {currentUser ? (
              <>
                <span className={styles.preTitle}>Que bom te ver de novo!</span>
              <h1 className={styles.mainTitle}>
                <span className={styles.titleLine}>Olá, {currentUser.name}</span>
                <span className={styles.titleHighlight}>Seu pet merece o melhor!</span>
              </h1>
                <p className={styles.heroDescription}>
                  Que tal agendar um cuidado especial para seu companheiro hoje?
                </p>
                <div className={styles.heroButtons}>
                  <Link to="/agendamento">
                    <Botao text="Agendar Agora" variant="primary" />
                  </Link>
                  <Link to="/profile">
                    <Botao text="Meu Perfil" variant="secondary" />
                  </Link>
                </div>
              </>
            ) : (
              <>
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
                  <Link to="/cadastro">
                <Botao variant="primary">
                  🐾 Agendar Agora
                </Botao>
              </Link>

              <Link to="/servicos">
                <Botao variant="secondary">
                  📋 Ver Serviços
                </Botao>
              </Link>
                </div>
              </>
            )}
          </div>
          
          <div className={styles.heroCard}>
            <div className={styles.flipCard}>
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.cardImageContainer}>
                    <img 
                      src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" 
                      alt="Clínica veterinária moderna" 
                      className={styles.cardImage}
                    />
                    <div className={styles.cardOverlay}></div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3>Conheça Nossa Estrutura</h3>
                    <p>Clique para ver mais</p>
                  </div>
                </div>
                <div className={styles.cardBack}>
                  <h3>Estrutura de Primeira</h3>
                  <p>Ambientes climatizados, equipamentos modernos e espaços projetados para o conforto do seu pet</p>
                  <div className={styles.cardStats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>500m²</span>
                      <span className={styles.statLabel}>de Área</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>24h</span>
                      <span className={styles.statLabel}>Monitoramento</span>
                    </div>
                  </div>
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

      {/* Services Preview - Links dinâmicos baseados no login */}
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
            <Link to={currentUser ? "/agendamento" : "/login"} className={styles.serviceLink}>
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
            <Link to={currentUser ? "/agendamento" : "/login"} className={styles.serviceLink}>
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
            <Link to={currentUser ? "/agendamento" : "/login"} className={styles.serviceLink}>
              <span>Saiba mais</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
<section className={styles.testimonialsSection}>
  <div className={styles.sectionHeader}>
    <h2 className={styles.sectionTitle}>O que dizem nossos clientes</h2>
    <p className={styles.sectionSubtitle}>A satisfação dos pets e seus donos é nossa maior recompensa</p>
  </div>
  
  <div className={styles.testimonialsGrid}>
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialImage}>
        <img 
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=662&q=80" 
          alt="Golden Retriever feliz"
        />
      </div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"Levo meu golden retriever há mais de 2 anos e sempre saio impressionado com o cuidado e profissionalismo. Recomendo!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Carlos Silva</h4>
        <span>Dono do Thor</span>
      </div>
    </div>
    
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialImage}>
        <img 
          src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Gato siamês elegante"
        />
      </div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"Minha gata Siamesa é extremamente arisca, mas a equipe tem uma paciência incrível. Enfim encontrei um lugar de confiança!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Ana Santos</h4>
        <span>Dona da Luna</span>
      </div>
    </div>
    
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialImage}>
        <img 
          src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
          alt="Labrador brincalhão"
        />
      </div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"O hotel salvou minhas férias! Deixei meu labrador por 10 dias e recebi fotos e atualizações diárias. Serviço excepcional!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Ricardo Oliveira</h4>
        <span>Dono do Max</span>
      </div>
    </div>

    
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialImage}>
        <img 
          src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
          alt="Labrador brincalhão"
        />
      </div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"O hotel salvou minhas férias! Deixei meu labrador por 10 dias e recebi fotos e atualizações diárias. Serviço excepcional!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Ricardo Oliveira</h4>
        <span>Dono do Max</span>
      </div>
    </div>
  
    
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialIcon}>🐱</div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"Minha gata Siamesa é extremamente arisca, mas a equipe tem uma paciência incrível. Enfim encontrei um lugar de confiança!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Ana Santos</h4>
        <span>Dona da Luna</span>
      </div>
    </div>
    
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialIcon}>🐶</div>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>❝</div>
        <p>"O hotel salvou minhas férias! Deixei meu labrador por 10 dias e recebi fotos e atualizações diárias. Serviço excepcional!"</p>
      </div>
      <div className={styles.testimonialAuthor}>
        <h4>Ricardo Oliveira</h4>
        <span>Dono do Max</span>
      </div>
    </div>


          
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>❝</div>
              <p>Minha gata Siamesa é extremamente arisca, mas a equipe da Pet Hero tem uma paciência incrível. Enfim encontrei um lugar de confiança!</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                alt="Ana Santos" 
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <h4>Ana Santos</h4>
                <span>Dona da Luna</span>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>❝</div>
              <p>O hotel da Pet Hero salvou minhas férias! Deixei meu labrador por 10 dias e recebi fotos e atualizações diárias. Serviço excepcional!</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <img 
                src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80" 
                alt="Ricardo Oliveira" 
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <h4>Ricardo Oliveira</h4>
                <span>Dono do Max</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresTextContent}>
            <h2 className={styles.sectionTitle}>Por que escolher a Pet Hero?</h2>
            <p className={styles.sectionSubtitle}>Descubra os diferenciais que nos tornam referência em cuidado animal</p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>⭐</div>
                <div className={styles.featureText}>
                  <h3>Profissionais Certificados</h3>
                  <p>Nossa equipe possui certificações internacionais em cuidado animal e treinamento contínuo</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🔬</div>
                <div className={styles.featureText}>
                  <h3>Tecnologia Avançada</h3>
                  <p>Utilizamos equipamentos de última geração para diagnóstico preciso e tratamentos eficazes</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🌿</div>
                <div className={styles.featureText}>
                  <h3>Produtos Naturais</h3>
                  <p>Shampoos e produtos hipoalergênicos, sustentáveis e testados dermatologicamente</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🚗</div>
                <div className={styles.featureText}>
                  <h3>Busca e Entrega</h3>
                  <p>Serviço de taxi dog para sua comodidade, com motoristas treinados no transporte animal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.featuresImageContent}>
            <div className={styles.featureImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Profissional cuidando de cachorro" 
                className={styles.featureImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Dinâmica */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOverlay}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <h2>Pronto para dar o melhor para seu pet?</h2>
          <p>Agende agora mesmo uma experiência premium de cuidado animal</p>
          <div className={styles.ctaButtons}>
            <Link to={currentUser ? "/agendamento" : "/login"}>
              <button className={styles.ctaButtonPrimary}>
                <span>{currentUser ? 'Fazer Novo Agendamento' : 'Agendar Agora'}</span>
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