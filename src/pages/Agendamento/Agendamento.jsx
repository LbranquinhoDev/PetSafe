import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Agendamento.module.css';
import Button from '../../components/Botao/Botao';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function Agendamento() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agendamentoData, setAgendamentoData] = useState({
    servico: '',
    data: '',
    hora: '',
    pet: '',
    observacoes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Lista de serviços disponíveis
  const servicos = [
    { id: 'banho', nome: 'Banho' },
    { id: 'tosa', nome: 'Tosa' },
    { id: 'banho-tosa', nome: 'Banho e Tosa' },
    { id: 'veterinario', nome: 'Consulta Veterinária' },
    { id: 'hospedagem', nome: 'Hospedagem' },
    { id: 'taxi', nome: 'Táxi Dog' }
  ];

  // Horários disponíveis
  const horarios = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleInputChange = (field, value) => {
    setAgendamentoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  if (!currentUser) {
    alert('Por favor, faça login para agendar');
    setLoading(false);
    return;
  }
  
  try {
    const novoAgendamento = {
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email,
      userEmail: currentUser.email,
      servico: agendamentoData.servico,
      servicoNome: servicos.find(s => s.id === agendamentoData.servico)?.nome,
      data: agendamentoData.data,
      hora: agendamentoData.hora,
      pet: agendamentoData.pet,
      observacoes: agendamentoData.observacoes || '',
      status: 'pendente',
      dataCriacao: serverTimestamp()
    };
    
    console.log('Salvando agendamento:', novoAgendamento);
    
    const docRef = await addDoc(collection(db, 'agendamentos'), novoAgendamento);
    
    console.log('Agendamento salvo com ID:', docRef.id);
    alert('Agendamento realizado com sucesso!');
    
    // Reset form
    setAgendamentoData({
      servico: '',
      data: '',
      hora: '',
      pet: '',
      observacoes: ''
    });
    setCurrentStep(1);
    
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    alert('Erro ao realizar agendamento: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  // Renderizar passo atual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <h2>Escolha o Serviço</h2>
            <p>Selecione o serviço desejado para seu pet</p>
            
            <div className={styles.servicosGrid}>
              {servicos.map(servico => (
                <div 
                  key={servico.id}
                  className={`${styles.servicoOption} ${agendamentoData.servico === servico.id ? styles.selected : ''}`}
                  onClick={() => handleInputChange('servico', servico.id)}
                >
                  <div className={styles.servicoIcon}>
                    {servico.id === 'banho' && '🚿'}
                    {servico.id === 'tosa' && '✂️'}
                    {servico.id === 'banho-tosa' && '🧼'}
                    {servico.id === 'veterinario' && '🏥'}
                    {servico.id === 'hospedagem' && '🏨'}
                    {servico.id === 'taxi' && '🚗'}
                  </div>
                  <h3>{servico.nome}</h3>
                </div>
              ))}
            </div>
            
            <div className={styles.stepButtons}>
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!agendamentoData.servico}
                loading={loading}
              >
                Próximo
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className={styles.step}>
            <h2>Informações do Pet</h2>
            <p>Nos conte sobre seu animalzinho</p>
            
            <div className={styles.inputGroup}>
              <label>Nome do Pet</label>
              <input
                type="text"
                value={agendamentoData.pet}
                onChange={(e) => handleInputChange('pet', e.target.value)}
                placeholder="Ex: Rex, Luna, etc."
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Observações</label>
              <textarea
                value={agendamentoData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Alguma informação importante? Comportamento, alergias, etc."
                rows="3"
                disabled={loading}
              />
            </div>
            
            <div className={styles.stepButtons}>
              <Button type="button" onClick={prevStep} variant="secondary" disabled={loading}>
                Voltar
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!agendamentoData.pet || loading}
                loading={loading}
              >
                Próximo
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className={styles.step}>
            <h2>Data e Horário</h2>
            <p>Escolha quando deseja agendar</p>
            
            <div className={styles.inputGroup}>
              <label>Data</label>
              <input
                type="date"
                value={agendamentoData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Horário</label>
              <div className={styles.horariosGrid}>
                {horarios.map(horario => (
                  <button
                    key={horario}
                    type="button"
                    className={`${styles.horarioOption} ${agendamentoData.hora === horario ? styles.selected : ''}`}
                    onClick={() => handleInputChange('hora', horario)}
                    disabled={loading}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.stepButtons}>
              <Button type="button" onClick={prevStep} variant="secondary" disabled={loading}>
                Voltar
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!agendamentoData.data || !agendamentoData.hora || loading}
                loading={loading}
              >
                Próximo
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className={styles.step}>
            <h2>Confirmação</h2>
            <p>Revise as informações do seu agendamento</p>
            
            <div className={styles.resumo}>
              <div className={styles.resumoItem}>
                <strong>Serviço:</strong>
                <span>{servicos.find(s => s.id === agendamentoData.servico)?.nome}</span>
              </div>
              <div className={styles.resumoItem}>
                <strong>Pet:</strong>
                <span>{agendamentoData.pet}</span>
              </div>
              <div className={styles.resumoItem}>
                <strong>Data:</strong>
                <span>{new Date(agendamentoData.data).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className={styles.resumoItem}>
                <strong>Horário:</strong>
                <span>{agendamentoData.hora}</span>
              </div>
              {agendamentoData.observacoes && (
                <div className={styles.resumoItem}>
                  <strong>Observações:</strong>
                  <span>{agendamentoData.observacoes}</span>
                </div>
              )}
            </div>
            
            <div className={styles.stepButtons}>
              <Button type="button" onClick={prevStep} variant="secondary" disabled={loading}>
                Voltar
              </Button>
              <Button type="submit" variant="primary" loading={loading} disabled={loading}>
                {loading ? 'Salvando...' : 'Confirmar Agendamento'}
              </Button>
            </div>
          </div>
        );
      
      default:
        return <div>Passo não encontrado</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Agendamento</h1>
        <p>Siga os passos para agendar o serviço do seu pet</p>
      </div>
      
      {/* Indicador de Progresso */}
      <div className={styles.progress}>
        <div className={styles.progressSteps}>
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={styles.stepIndicator}>
              <div className={`${styles.stepNumber} ${currentStep >= step ? styles.active : ''}`}>
                {step}
              </div>
              <div className={styles.stepLabel}>
                {step === 1 && 'Serviço'}
                {step === 2 && 'Pet'}
                {step === 3 && 'Data/Hora'}
                {step === 4 && 'Confirmação'}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {renderStep()}
      </form>
    </div>
  );
}