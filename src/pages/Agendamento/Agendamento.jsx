import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "/src/pages/Agendamento/Agendamento.module.css";
import LayoutPadrao from '../../components/LayoutPadrao';

const Agendamento = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [step, setStep] = useState(1); // 1: Login, 2: Selecionar serviço, 3: Selecionar data/hora, 4: Confirmar

  // Dados de exemplo
  const services = [
    { id: 1, name: 'Banho e Tosa', duration: '60 min', price: 'R$ 60,00' },
    { id: 2, name: 'Consulta Veterinária', duration: '30 min', price: 'R$ 120,00' },
    { id: 3, name: 'Passeio com Pet', duration: '45 min', price: 'R$ 35,00' },
    { id: 4, name: 'Hospedagem', duration: 'Período', price: 'R$ 90,00/dia' },
    { id: 5, name: 'Taxi Dog', duration: 'Variável', price: 'R$ 40,00' },
    { id: 6, name: 'Creche para Pets', duration: 'Período', price: 'R$ 70,00/dia' }
  ];

  // Horários disponíveis (exemplo)
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00'
  ];

  // Próximas datas disponíveis
  const availableDates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0) { // Não mostrar domingos
      availableDates.push(date.toISOString().split('T')[0]);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de login aqui
    setIsLoggedIn(true);
    setStep(2);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro aqui
    setIsLoggedIn(true);
    setStep(2);
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setStep(3);
  };

  const handleDateTimeSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(4);
  };

  const handleConfirmAgendamento = () => {
    // Lógica para confirmar o agendamento
    alert('Agendamento confirmado com sucesso!');
    // Redirecionar ou limpar o formulário
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <LayoutPadrao>
      <div className={styles.agendamentoContainer}>
        <div className={styles.agendamentoHeader}>
          <h1>Agendamento</h1>
          <p>Agende os melhores cuidados para seu pet de forma rápida e fácil</p>
        </div>

        <div className={styles.agendamentoProgress}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
            <span>1</span>
            <p>Login</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
            <span>2</span>
            <p>Serviço</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
            <span>3</span>
            <p>Data/Hora</p>
          </div>
          <div className={`${styles.progressStep} ${step >= 4 ? styles.active : ''}`}>
            <span>4</span>
            <p>Confirmação</p>
          </div>
        </div>

        <div className={styles.agendamentoContent}>
          {/* Passo 1: Login/Cadastro */}
          {step === 1 && (
            <div className={styles.loginSection}>
              <div className={styles.authTabs}>
                <button 
                  className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'register' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Cadastro
                </button>
              </div>

              {activeTab === 'login' ? (
                <form className={styles.authForm} onSubmit={handleLogin}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="seu@email.com" 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder="Sua senha" 
                      required 
                    />
                  </div>
                  <div className={styles.formOptions}>
                    <label className={styles.rememberMe}>
                      <input type="checkbox" />
                      Lembrar-me
                    </label>
                    <Link to="/recuperar-senha" className={styles.forgotPassword}>
                      Esqueci a senha
                    </Link>
                  </div>
                  <button type="submit" className={styles.authButton}>
                    Entrar
                  </button>
                </form>
              ) : (
                <form className={styles.authForm} onSubmit={handleRegister}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Nome completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Seu nome completo" 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="registerEmail">Email</label>
                    <input 
                      type="email" 
                      id="registerEmail" 
                      placeholder="seu@email.com" 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="registerPassword">Senha</label>
                    <input 
                      type="password" 
                      id="registerPassword" 
                      placeholder="Crie uma senha" 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      placeholder="Confirme sua senha" 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Telefone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="(11) 99999-9999" 
                      required 
                    />
                  </div>
                  <div className={styles.terms}>
                    <label className={styles.termsLabel}>
                      <input type="checkbox" required />
                      <span>Concordo com os <Link to="/termos">termos de uso</Link> e <Link to="/privacidade">política de privacidade</Link></span>
                    </label>
                  </div>
                  <button type="submit" className={styles.authButton}>
                    Criar conta
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Passo 2: Seleção de Serviço */}
          {step === 2 && (
            <div className={styles.serviceSection}>
              <h2>Selecione o serviço desejado</h2>
              <div className={styles.servicesGrid}>
                {services.map(service => (
                  <div 
                    key={service.id} 
                    className={`${styles.serviceCard} ${selectedService === service.id ? styles.selected : ''}`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className={styles.serviceIcon}>
                      <img src={`/icons/service-${service.id}.svg`} alt={service.name} />
                    </div>
                    <h3>{service.name}</h3>
                    <p className={styles.serviceDuration}>{service.duration}</p>
                    <p className={styles.servicePrice}>{service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 3: Seleção de Data e Hora */}
          {step === 3 && (
            <div className={styles.datetimeSection}>
              <h2>Selecione a data e horário</h2>
              
              <div className={styles.dateSelection}>
                <h3>Data</h3>
                <div className={styles.datesGrid}>
                  {availableDates.map(date => (
                    <button
                      key={date}
                      className={`${styles.dateButton} ${selectedDate === date ? styles.selected : ''}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className={styles.timeSelection}>
                  <h3>Horários disponíveis</h3>
                  <div className={styles.timesGrid}>
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        className={`${styles.timeButton} ${selectedTime === time ? styles.selected : ''}`}
                        onClick={() => handleDateTimeSelect(selectedDate, time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Passo 4: Confirmação */}
          {step === 4 && (
            <div className={styles.confirmationSection}>
              <h2>Confirme seu agendamento</h2>
              
              <div className={styles.confirmationDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Serviço:</span>
                  <span className={styles.detailValue}>
                    {services.find(s => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Data:</span>
                  <span className={styles.detailValue}>
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Horário:</span>
                  <span className={styles.detailValue}>
                    {selectedTime}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duração:</span>
                  <span className={styles.detailValue}>
                    {services.find(s => s.id === selectedService)?.duration}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Preço:</span>
                  <span className={styles.detailValue}>
                    {services.find(s => s.id === selectedService)?.price}
                  </span>
                </div>
              </div>

              <div className={styles.petInfo}>
                <h3>Informações do Pet</h3>
                <form className={styles.petForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="petName">Nome do Pet</label>
                      <input 
                        type="text" 
                        id="petName" 
                        placeholder="Nome do seu pet" 
                        required 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="petType">Tipo</label>
                      <select id="petType" required>
                        <option value="">Selecione</option>
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                        <option value="bird">Pássaro</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="petBreed">Raça</label>
                      <input 
                        type="text" 
                        id="petBreed" 
                        placeholder="Raça do pet" 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="petAge">Idade</label>
                      <input 
                        type="number" 
                        id="petAge" 
                        placeholder="Idade em anos" 
                        min="0" 
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="specialInstructions">Instruções especiais</label>
                    <textarea 
                      id="specialInstructions" 
                      placeholder="Alguma informação importante que devemos saber sobre seu pet?"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className={styles.confirmationActions}>
                <button 
                  className={styles.backButton}
                  onClick={() => setStep(3)}
                >
                  Voltar
                </button>
                <button 
                  className={styles.confirmButton}
                  onClick={handleConfirmAgendamento}
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutPadrao>
  );
};

export default Agendamento;