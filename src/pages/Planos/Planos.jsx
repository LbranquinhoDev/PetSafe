import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Planos.module.css';
import Botao from '../../components/Botao/Botao';

const Planos = () => {
  const { currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basico',
      title: 'Plano Básico',
      subtitle: 'Para cuidados essenciais',
      price: '89',
      period: 'por serviço',
      popular: false,
      features: [
        '✅ Banho completo',
        '✅ Tosa higiênica',
        '✅ Secagem profissional',
        '✅ Perfume suave',
        '✅ Escovação',
        '✅ Limpeza de ouvidos',
        '❌ Corte de unhas',
        '❌ Hidratação'
      ],
      icon: '🚿',
      color: '#3B82F6'
    },
    {
      id: 'premium',
      title: 'Plano Premium',
      subtitle: 'Cuidado completo',
      price: '149',
      period: 'por serviço',
      popular: true,
      features: [
        '✅ Banho luxo',
        '✅ Tosa completa',
        '✅ Hidratação premium',
        '✅ SPA pet',
        '✅ Brinde especial',
        '✅ Corte de unhas',
        '✅ Massagem relaxante',
        '✅ Foto profissional'
      ],
      icon: '✨',
      color: '#8B5CF6'
    },
    {
      id: 'vip',
      title: 'Plano VIP',
      subtitle: 'Experiência máxima',
      price: '299',
      period: 'mensal',
      popular: false,
      features: [
        '✅ 4 banhos por mês',
        '✅ Tosa ilimitada',
        '✅ Day SPA completo',
        '✅ Transporte grátis',
        '✅ Desconto 20%',
        '✅ Consultas prioritárias',
        '✅ Kit premium mensal',
        '✅ Suporte 24/7'
      ],
      icon: '👑',
      color: '#F59E0B'
    },
    {
      id: 'familia',
      title: 'Plano Família',
      subtitle: 'Para múltiplos pets',
      price: '399',
      period: 'mensal',
      popular: false,
      features: [
        '✅ Até 3 pets',
        '✅ 2 banhos por pet/mês',
        '✅ 1 tosa por pet/mês',
        '✅ 15% de desconto',
        '✅ Transporte inclusivo',
        '✅ Agendamento prioritário',
        '✅ Fotos em família',
        '✅ Brinde mensal'
      ],
      icon: '👨‍👩‍👧‍👦',
      color: '#10B981'
    }
  ];

  const benefits = [
    {
      icon: '⭐',
      title: 'Profissionais Certificados',
      description: 'Equipe especializada com treinamento internacional'
    },
    {
      icon: '🔬',
      title: 'Tecnologia Avançada',
      description: 'Equipamentos modernos para o melhor cuidado'
    },
    {
      icon: '🌿',
      title: 'Produtos Naturais',
      description: 'Shampoos e produtos hipoalergênicos premium'
    },
    {
      icon: '🚗',
      title: 'Busca e Entrega',
      description: 'Taxi dog com motoristas especializados'
    },
    {
      icon: '📱',
      title: 'App Exclusivo',
      description: 'Acompanhe tudo pelo seu smartphone'
    },
    {
      icon: '🏆',
      title: 'Garantia de Qualidade',
      description: 'Satisfação garantida ou seu dinheiro de volta'
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    // Scroll para o formulário de agendamento
    document.getElementById('agendamento-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Planos PetSafe</h1>
          <p className={styles.heroSubtitle}>
            Escolha o cuidado perfeito para seu companheiro. 
            Oferecemos opções para todos os bolsos e necessidades.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>2,500+</span>
              <span className={styles.statLabel}>Pets Felizes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Avaliação 5★</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Suporte</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2>Nossos Planos</h2>
          <p>Encontre o plano ideal para o seu pet</p>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles.planCard} ${plan.popular ? styles.popular : ''}`}
              style={{ '--accent-color': plan.color }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  ⭐ Mais Popular
                </div>
              )}

              <div className={styles.planHeader}>
                <div className={styles.planIcon}>{plan.icon}</div>
                <h3>{plan.title}</h3>
                <p>{plan.subtitle}</p>
              </div>

              <div className={styles.planPrice}>
                <span className={styles.price}>R$ {plan.price}</span>
                <span className={styles.period}>/{plan.period}</span>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.planActions}>
                {currentUser ? (
                  <Link 
                    to={`/agendamento?plano=${plan.id}`}
                    className={styles.planLink}
                  >
                    <Botao 
                      variant={plan.popular ? "primary" : "secondary"}
                      text="Escolher Plano"
                      fullWidth
                    />
                  </Link>
                ) : (
                  <Link 
                    to="/cadastro"
                    className={styles.planLink}
                  >
                    <Botao 
                      variant={plan.popular ? "primary" : "secondary"}
                      text="Cadastrar e Escolher"
                      fullWidth
                    />
                  </Link>
                )}
                
                <button 
                  className={styles.detailsButton}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Ver detalhes completos
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.sectionHeader}>
          <h2>Vantagens Exclusivas</h2>
          <p>Todos os planos incluem nossos benefícios premium</p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2>Perguntas Frequentes</h2>
          <p>Tire todas suas dúvidas sobre nossos planos</p>
        </div>

        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>Posso trocar de plano a qualquer momento?</h3>
            <p>Sim! Você pode trocar de plano a qualquer momento sem custo adicional.</p>
          </div>

          <div className={styles.faqItem}>
            <h3>Os planos têm fidelidade?</h3>
            <p>Não exigimos fidelidade. Você pode cancelar quando quiser.</p>
          </div>

          <div className={styles.faqItem}>
            <h3>Como funciona o transporte?</h3>
            <p>Oferecemos busca e entrega grátis para planos Premium e VIP.</p>
          </div>

          <div className={styles.faqItem}>
            <h3>Posso agendar pelo app?</h3>
            <p>Sim! Todos os clientes têm acesso ao nosso app exclusivo.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Pronto para escolher?</h2>
          <p>Junte-se a milhares de donos que confiam na PetSafe</p>
          <div className={styles.ctaButtons}>
            <Link to={currentUser ? "/agendamento" : "/cadastro"}>
              <Botao 
                variant="primary" 
                size="large"
                text={currentUser ? "Fazer Agendamento" : "Criar Minha Conta"}
              />
            </Link>
            <Link to="/contato">
              <Botao 
                variant="secondary" 
                size="large"
                text="Falar com Consultor"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Planos;