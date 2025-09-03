import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import LayoutPadrao from '../../components/LayoutPadrao';

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    setAnimate(true);
    
    // Intersection Observer para animações ao scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);
    
    // Observar todos os elementos com a classe observe
    document.querySelectorAll(`.${styles.observe}`).forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <LayoutPadrao>
      {/* Hero Section com Vídeo de Fundo Animado */}
      <section className={styles.hero}>
        <div className={styles.heroVideoContainer}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={styles.heroVideo}
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/pets-hero-animated.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Cuidamos do seu</span>
            <span className={styles.titleLine}>pet com amor</span>
          </h1>
          <p className={styles.heroSubtitle}>Serviços personalizados para quem ama pets mas tem pouco tempo</p>
          <div className={styles.ctaContainer}>
            <Link to="/servicos" className={styles.ctaPrimary}>Conheça nossos serviços</Link>
            <Link to="/agendamento" className={styles.ctaSecondary}>
              <span>Agendar agora</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll down</span>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className={`${styles.benefits} ${styles.observe}`}>
        <div className={styles.sectionHeader}>
          <h2>Por que escolher a PetSafe?</h2>
          <p>Oferecemos o melhor cuidado para seu pet com conveniência e qualidade</p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <div className={styles.iconWrapper}>
                <img src="/icons/agendamento-icon.svg" alt="Agendamento flexível" />
              </div>
            </div>
            <h3>Agendamento Flexível</h3>
            <p>Você escolhe o horário, nós cuidamos do resto.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <div className={styles.iconWrapper}>
                <img src="/icons/especialistas-icon.svg" alt="Equipe especializada" />
              </div>
            </div>
            <h3>Equipe Especializada</h3>
            <p>Profissionais apaixonados por pets.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <div className={styles.iconWrapper}>
                <img src="/icons/rapido-icon.svg" alt="Atendimento rápido" />
              </div>
            </div>
            <h3>Atendimento Rápido</h3>
            <p>Serviços eficientes sem perder a qualidade.</p>
          </div>
        </div>
      </section>

      {/* Seção de Vídeo Demonstrativo */}
      <section className={`${styles.videoSection} ${styles.observe}`}>
        <div className={styles.videoContainer}>
          <div className={styles.videoContent}>
            <h2>Veja como funcionamos</h2>
            <p>Conheça nossos processos e instalações em um tour virtual pela PetSafe</p>
            <div className={styles.videoStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Pets felizes</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Avaliação positiva</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Suporte</span>
              </div>
            </div>
          </div>
          <div className={styles.videoPlayer}>
            <div className={styles.videoWrapper}>
              <video 
                ref={videoRef}
                className={styles.demoVideo}
                poster="/images/video-poster.jpg"
                onClick={toggleVideoPlay}
              >
                <source src="/videos/demo-petsafe.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>
              {!isVideoPlaying && (
                <div className={styles.videoPlayButton} onClick={toggleVideoPlay}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Serviços Essenciais */}
      <section className={`${styles.essentials} ${styles.observe}`}>
        <div className={styles.sectionHeader}>
          <h2>Cuidados Essenciais</h2>
          <p>Oferecemos serviços completos para o bem-estar do seu pet</p>
        </div>
        <div className={styles.blocks}>
          <div className={`${styles.block} ${styles.grooming}`}>
            <div className={styles.blockContent}>
              <img src="/images/banho-tosa.png" alt="Banho e Tosa" className={styles.icon} />
              <h3>Banho & Tosa</h3>
              <p>Higiene e conforto para a sua melhor companhia.</p>
              <Link to="/servicos/banho-tosa" className={styles.serviceLink}>
                <span>Saiba mais</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className={`${styles.block} ${styles.vet}`}>
            <div className={styles.blockContent}>
              <img src="/images/veterinario.png" alt="Veterinário" className={styles.icon} />
              <h3>Veterinário</h3>
              <p>A saúde do seu pet em dia, com atendimento profissional e carinho.</p>
              <Link to="/servicos/veterinario" className={styles.serviceLink}>
                <span>Saiba mais</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className={`${styles.block} ${styles.walking}`}>
            <div className={styles.blockContent}>
              <img src="/images/passeio.png" alt="Passeio" className={styles.icon} />
              <h3>Passeios</h3>
              <p>Exercício e diversão para seu pet, mesmo com sua agenda cheia.</p>
              <Link to="/servicos/passeios" className={styles.serviceLink}>
                <span>Saiba mais</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos com Vídeos */}
      <section className={`${styles.testimonials} ${styles.observe}`}>
        <div className={styles.sectionHeader}>
          <h2>O que nossos clientes dizem</h2>
          <p>A satisfação dos pets e seus donos é nossa maior recompensa</p>
        </div>
        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialVideo}>
            <div className={styles.videoCard}>
              <video 
                muted 
                playsInline 
                className={styles.testimonialVid}
                poster="/images/testimonial1-poster.jpg"
              >
                <source src="/videos/testimonial1.mp4" type="video/mp4" />
              </video>
              <div className={styles.videoOverlay}>
                <button className={styles.playTestimonial}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                </button>
                <div className={styles.testimonialInfo}>
                  <h4>Maria Silva</h4>
                  <p>Tutora do Thor</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonialContent}>
            <div className={styles.testimonialQuote}>
              <div className={styles.quoteIcon}>"</div>
              <p>A PetSafe revolucionou a forma como cuido do meu labrador. Agendo tudo pelo app e sei que posso confiar! A equipe é incrível e o Thor sempre volta feliz dos passeios.</p>
              <div className={styles.clientInfo}>
                <img src="/images/clientes/cliente1.jpg" alt="Maria Silva" />
                <div>
                  <h4>Maria Silva</h4>
                  <p>Tutora do Thor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nova Seção: Blog ou Dicas para Pets (substituindo o App) */}
      <section className={`${styles.blogSection} ${styles.observe}`}>
        <div className={styles.sectionHeader}>
          <h2>Dicas e Cuidados para seu Pet</h2>
          <p>Aprenda a melhor forma de cuidar do seu companheiro com nossas dicas exclusivas</p>
        </div>
        <div className={styles.blogContainer}>
          <div className={styles.blogCard}>
            <div className={styles.blogImage}>
              <img src="/images/blog/dicas-banho.jpg" alt="Dicas para banho" />
              <div className={styles.blogCategory}>Higiene</div>
            </div>
            <div className={styles.blogContent}>
              <h3>Como dar banho no seu pet em casa</h3>
              <p>Aprenda o passo a passo para um banho seguro e tranquilo sem sair de casa.</p>
              <Link to="/blog/banho-em-casa" className={styles.blogLink}>
                Ler mais
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className={styles.blogCard}>
            <div className={styles.blogImage}>
              <img src="/images/blog/alimentacao-saudavel.jpg" alt="Alimentação saudável" />
              <div className={styles.blogCategory}>Nutrição</div>
            </div>
            <div className={styles.blogContent}>
              <h3>Guia de alimentação saudável para cães</h3>
              <p>Descubra os alimentos mais recomendados e os que devem ser evitados.</p>
              <Link to="/blog/alimentacao-canina" className={styles.blogLink}>
                Ler mais
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className={styles.blogCard}>
            <div className={styles.blogImage}>
              <img src="/images/blog/brinquedos-pets.jpg" alt="Brinquedos para pets" />
              <div className={styles.blogCategory}>Bem-estar</div>
            </div>
            <div className={styles.blogContent}>
              <h3>Os melhores brinquedos para entreter seu pet</h3>
              <p>Conheça opções seguras e divertidas para manter seu animal ativo e feliz.</p>
              <Link to="/blog/brinquedos-pets" className={styles.blogLink}>
                Ler mais
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.blogCta}>
          <Link to="/blog" className={styles.ctaTertiary}>
            Ver todas as dicas
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`${styles.newsletter} ${styles.observe}`}>
        <div className={styles.newsletterContent}>
          <h2>Fique por dentro das novidades</h2>
          <p>Cadastre-se para receber dicas de cuidado pet e promoções exclusivas</p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Seu melhor email" 
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>Inscrever-se</button>
          </form>
        </div>
      </section>
    </LayoutPadrao>
  );
};

export default Home;