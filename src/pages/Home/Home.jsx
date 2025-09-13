import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';
import Botao from '../../components/Botao/Botao';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [randomPetImage, setRandomPetImage] = useState('');
  const { currentUser } = useAuth();
  
  // Imagens de hero (background)
  const heroImages = [
    "https://images.unsplash.com/photo-1577720643272-265f0936742f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1551144608-9b034ccdf98d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ];

  // Imagens aleatórias de pets (para o card)
  const petImages = [
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop", // Cachorro feliz
    "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop", // Gato elegante
    "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop", // Labrador
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop", // Golden Retriever
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop", // Gato exótico
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"  // Veterinário
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Carlos Silva",
      pet: "Thor (Golden Retriever)",
      text: "Levo meu golden há 2 anos e sempre saio impressionado com o cuidado e profissionalismo!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ana Santos", 
      pet: "Luna (Gata Siamês)",
      text: "Minha gata é arisca, mas a equipe tem paciência incrível. Enfim encontrei um lugar de confiança!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ricardo Oliveira",
      pet: "Max (Labrador)",
      text: "O hotel salvou minhas férias! Recebi fotos e atualizações diárias do meu labrador.",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face"
    }
  ];

   const features = [
    {
      icon: "⭐",
      title: "Profissionais Certificados",
      description: "Equipe com certificações internacionais e treinamento contínuo"
    },
    {
      icon: "🔬",
      title: "Tecnologia Avançada",
      description: "Equipamentos de última geração para diagnósticos precisos"
    },
    {
      icon: "🌿",
      title: "Produtos Naturais",
      description: "Shampoos e produtos hipoalergênicos e sustentáveis"
    },
    {
      icon: "🚗",
      title: "Busca e Entrega",
      description: "Taxi dog com motoristas treinados no transporte animal"
    }
  ];

  // Dados para a seção de preços (Uiverse 2)
  const pricingPlans = [
    {
      title: "Plano Básico",
      price: "R$ 89",
      period: "por serviço",
      features: ["Banho completo", "Tosa higiênica", "Secagem", "Perfume suave"],
      popular: false
    },
    {
      title: "Plano Premium",
      price: "R$ 149",
      period: "por serviço",
      features: ["Banho luxo", "Tosa completa", "Hidratação", "SPA pet", "Brinde"],
      popular: true
    },
    {
      title: "Plano VIP",
      price: "R$ 299",
      period: "mensal",
      features: ["4 banhos/mês", "Tosa ilimitada", "Day SPA", "Transporte", "Desconto 20%"],
      popular: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const randomIndex = Math.floor(Math.random() * petImages.length);
    setRandomPetImage(petImages[randomIndex]);

    return () => clearInterval(interval);
  }, []);

  const getUserName = () => {
    if (!currentUser) return '';
    return currentUser.displayName || currentUser.email?.split('@')[0] || 'Amigo';
  };


  return (
    <div className={styles.container}>
      {/* Hero Section */}
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
                  <span className={styles.titleLine}>Olá, {getUserName()}</span>
                  <span className={styles.titleHighlight}>Seu pet merece o melhor!</span>
                </h1>
                <p className={styles.heroDescription}>
                  Que tal agendar um cuidado especial para seu companheiro hoje?
                </p>
                <div className={styles.heroButtons}>
                  <Link to="/agendamento">
                  <Botao variant="primary" text="🐾 Agendar Agora" />
                  </Link>
                  <Link to="/planos">
                  <Botao variant="secondary" text="📋 Planos" />
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
                  Na PetSafe, oferecemos serviços premium de banho, tosa, cuidados veterinários 
                  e hospedagem para seu companheiro.
                </p>
                <div className={styles.heroButtons}>
                  <Link to="/cadastro">
                    <Botao variant="primary">
                      🐾 Começar Agora
                    </Botao>
                  </Link>
                  <Link to="/login">
                    <Botao variant="secondary">
                      🔑 Fazer Login
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
                      src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop" 
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
                  <p>Ambientes climatizados, equipamentos modernos e muito conforto</p>
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
            <span className={styles.statLabel}>Pets Felizes</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>98%</span>
            </div>
            <span className={styles.statLabel}>Avaliação 5★</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>15</span>
            </div>
            <span className={styles.statLabel}>Especialistas</span>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statCircle}>
              <span className={styles.statNumber}>24/7</span>
            </div>
            <span className={styles.statLabel}>Disponível</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2>Nossos Serviços</h2>
          <p>Cuidados completos para todas as necessidades do seu pet</p>
        </div>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🚿</div>
            <h3>Banho & Tosa</h3>
            <p>Banho relaxante, tosa especializada e cuidados estéticos profissionais</p>
            <Link to={currentUser ? "/agendamento" : "/cadastro"} className={styles.serviceLink}>
              Agendar agora →
            </Link>
          </div>
          
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🏥</div>
            <h3>Veterinário</h3>
            <p>Consultas, vacinas e tratamentos com especialistas qualificados</p>
            <Link to={currentUser ? "/agendamento" : "/cadastro"} className={styles.serviceLink}>
              Agendar agora →
            </Link>
          </div>
          
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🏨</div>
            <h3>Hospedagem</h3>
            <p>Hotel 5 estrelas com monitoramento 24h e muito conforto</p>
            <Link to={currentUser ? "/agendamento" : "/cadastro"} className={styles.serviceLink}>
              Agendar agora →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Uiverse 1 */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Recursos Exclusivos</h2>
          <p>Tudo que seu pet merece em um só lugar</p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section - Uiverse 2 */}
      <section className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2>Planos Acessíveis</h2>
          <p>Escolha o plano perfeito para o seu pet</p>
        </div>
        
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}>
              {plan.popular && <div className={styles.popularBadge}>Mais Popular</div>}
              
              <div className={styles.pricingHeader}>
                <h3>{plan.title}</h3>
                <div className={styles.price}>
                  <span className={styles.priceAmount}>{plan.price}</span>
                  <span className={styles.pricePeriod}>{plan.period}</span>
                </div>
              </div>
              
              <ul className={styles.featuresList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <span className={styles.checkIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link to="/cadastro">
                <Botao variant={plan.popular ? "primary" : "secondary"} text="Escolher Plano" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Uiverse 3 */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2>O que dizem nossos clientes</h2>
          <p>A felicidade dos pets é nossa maior recompensa</p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>❝</div>
                <p>"{testimonial.text}"</p>
              </div>
              
              <div className={styles.testimonialAuthor}>
                <img src={testimonial.image} alt={testimonial.name} />
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.pet}</span>
                </div>
              </div>
              
              <div className={styles.testimonialRating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.star}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        {/* ... (código anterior do CTA) ... */}
      </section>
    </div>
  );
};

export default Home;