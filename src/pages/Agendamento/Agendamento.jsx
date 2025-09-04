// src/pages/Agendamento/Agendamento.js
import React, { useState } from 'react';
import styles from './Agendamento.module.css';

const Agendamento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    petName: '',
    petBreed: '',
    petAge: '',
    observations: ''
  });

  const steps = [
    {
      id: 1,
      title: "Seleção de Serviço",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending",
      description: "Escolha o serviço para seu pet",
      time: "Passo 1 de 4"
    },
    {
      id: 2,
      title: "Data e Horário",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending",
      description: "Selecione quando deseja agendar",
      time: "Passo 2 de 4"
    },
    {
      id: 3,
      title: "Informações do Pet",
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "active" : "pending",
      description: "Dados do seu animal",
      time: "Passo 3 de 4"
    },
    {
      id: 4,
      title: "Confirmação",
      status: currentStep === 4 ? "active" : "pending",
      description: "Revise e confirme o agendamento",
      time: "Passo 4 de 4"
    }
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setFormData(prev => ({
      ...prev,
      service
    }));
    nextStep();
  };

  const handleDateTimeSelect = (date, time) => {
    setFormData(prev => ({
      ...prev,
      date,
      time
    }));
    nextStep();
  };

  const handleSubmit = () => {
    alert('Agendamento confirmado com sucesso!');
    // Aqui você faria a submissão para sua API
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Agendamento</h1>
        <p>Agende os serviços para seu pet em poucos passos</p>
      </div>
      
      {/* Conteúdo do passo atual */}
      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <div className={styles.serviceSelection}>
            <h2>Selecione o Serviço</h2>
            <div className={styles.serviceGrid}>
              <div 
                className={`${styles.serviceCard} ${formData.service === 'Banho e Tosa' ? styles.selected : ''}`}
                onClick={() => handleServiceSelect('Banho e Tosa')}
              >
                <div className={styles.serviceIcon}>🐕</div>
                <h3>Banho e Tosa</h3>
                <p>Banho completo, tosa higiênica e escovação</p>
                <span className={styles.servicePrice}>R$ 60,00</span>
              </div>
              <div 
                className={`${styles.serviceCard} ${formData.service === 'Consulta Veterinária' ? styles.selected : ''}`}
                onClick={() => handleServiceSelect('Consulta Veterinária')}
              >
                <div className={styles.serviceIcon}>🏥</div>
                <h3>Consulta Veterinária</h3>
                <p>Check-up completo com veterinário especializado</p>
                <span className={styles.servicePrice}>R$ 120,00</span>
              </div>
              <div 
                className={`${styles.serviceCard} ${formData.service === 'Tosa Completa' ? styles.selected : ''}`}
                onClick={() => handleServiceSelect('Tosa Completa')}
              >
                <div className={styles.serviceIcon}>✂️</div>
                <h3>Tosa Completa</h3>
                <p>Tosa estética de acordo com a raça do seu pet</p>
                <span className={styles.servicePrice}>R$ 80,00</span>
              </div>
              <div 
                className={`${styles.serviceCard} ${formData.service === 'Daycare' ? styles.selected : ''}`}
                onClick={() => handleServiceSelect('Daycare')}
              >
                <div className={styles.serviceIcon}>🦴</div>
                <h3>Daycare</h3>
                <p>Cuidadoria durante o dia com atividades recreativas</p>
                <span className={styles.servicePrice}>R$ 45,00</span>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className={styles.dateTimeSelection}>
            <h2>Selecione Data e Horário</h2>
            <div className={styles.calendarContainer}>
              <div className={styles.calendar}>
                <h3>Junho 2023</h3>
                <div className={styles.calendarGrid}>
                  <div className={styles.weekdays}>
                    <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                  </div>
                  <div className={styles.days}>
                    {[28, 29, 30, 31, 1, 2, 3].map(day => (
                      <div key={day} className={styles.day}>{day}</div>
                    ))}
                    {[4, 5, 6, 7, 8, 9, 10].map(day => (
                      <div 
                        key={day} 
                        className={`${styles.day} ${styles.available}`}
                        onClick={() => handleDateTimeSelect(`2023-06-${day}`, '')}
                      >
                        {day}
                      </div>
                    ))}
                    {[11, 12, 13, 14, 15, 16, 17].map(day => (
                      <div 
                        key={day} 
                        className={`${styles.day} ${styles.available}`}
                        onClick={() => handleDateTimeSelect(`2023-06-${day}`, '')}
                      >
                        {day}
                      </div>
                    ))}
                    {[18, 19, 20, 21, 22, 23, 24].map(day => (
                      <div 
                        key={day} 
                        className={`${styles.day} ${styles.available}`}
                        onClick={() => handleDateTimeSelect(`2023-06-${day}`, '')}
                      >
                        {day}
                      </div>
                    ))}
                    {[25, 26, 27, 28, 29, 30, 1].map(day => (
                      <div key={day} className={styles.day}>{day}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.timeSlots}>
                <h3>Horários Disponíveis</h3>
                <div className={styles.timeGrid}>
                  {['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'].map(time => (
                    <div 
                      key={time} 
                      className={styles.timeSlot}
                      onClick={() => handleDateTimeSelect(formData.date, time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className={styles.petInfo}>
            <h2>Informações do Pet</h2>
            <form className={styles.petForm}>
              <input 
                type="text" 
                name="petName"
                placeholder="Nome do Pet" 
                value={formData.petName}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="petBreed"
                placeholder="Raça" 
                value={formData.petBreed}
                onChange={handleInputChange}
              />
              <input 
                type="number" 
                name="petAge"
                placeholder="Idade" 
                value={formData.petAge}
                onChange={handleInputChange}
              />
              <textarea 
                name="observations"
                placeholder="Observações especiais"
                value={formData.observations}
                onChange={handleInputChange}
              ></textarea>
              
              <div className={styles.formButtons}>
                <button type="button" onClick={prevStep} className={styles.secondaryButton}>
                  Voltar
                </button>
                <button type="button" onClick={nextStep} className={styles.primaryButton}>
                  Continuar
                </button>
              </div>
            </form>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className={styles.confirmation}>
            <h2>Confirmação do Agendamento</h2>
            <div className={styles.confirmationCard}>
              <h3>Resumo do Agendamento</h3>
              <p><strong>Serviço:</strong> {formData.service}</p>
              <p><strong>Data:</strong> {formData.date}</p>
              <p><strong>Horário:</strong> {formData.time}</p>
              <p><strong>Pet:</strong> {formData.petName} ({formData.petBreed}, {formData.petAge} anos)</p>
              {formData.observations && <p><strong>Observações:</strong> {formData.observations}</p>}
              
              <div className={styles.confirmationButtons}>
                <button type="button" onClick={prevStep} className={styles.secondaryButton}>
                  Editar
                </button>
                <button type="button" onClick={handleSubmit} className={styles.primaryButton}>
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stepper fixo na parte inferior */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepperBox}>
          {steps.map((step, index) => (
            <div key={step.id} className={`${styles.stepperStep} ${styles[`stepper${step.status.charAt(0).toUpperCase() + step.status.slice(1)}`]}`}>
              <div className={styles.stepperCircle}>
                {step.status === "completed" ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"></path>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && <div className={styles.stepperLine}></div>}
              <div className={styles.stepperContent}>
                <div className={styles.stepperTitle}>{step.title}</div>
                <div className={styles.stepperStatus}>
                  {step.status === "completed" ? "Concluído" : 
                  step.status === "active" ? "Em Andamento" : "Pendente"}
                </div>
                <div className={styles.stepperTime}>{step.time}</div>
              </div>
            </div>
          ))}

          <div className={styles.stepperControls}>
            <button className={styles.stepperButton} onClick={prevStep} disabled={currentStep === 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>
              </svg>
              Anterior
            </button>
            <button className={`${styles.stepperButton} ${styles.stepperButtonPrimary}`} onClick={nextStep} disabled={currentStep === 4}>
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;