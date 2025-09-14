import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './MeusAgendamentos.module.css';
import Button from '../../components/Botao/Botao';

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    console.log('Buscando agendamentos para usuário:', currentUser.uid);
    
    const fetchAgendamentos = () => {
      try {
        const q = query(
          collection(db, 'agendamentos'),
          where('userId', '==', currentUser.uid),
          orderBy('dataCriacao', 'desc')
        );

        const unsubscribe = onSnapshot(q, 
          (querySnapshot) => {
            console.log('Dados recebidos do Firestore:', querySnapshot.size, 'documentos');
            
            const agendamentosData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log('Documento:', doc.id, data);
              
              agendamentosData.push({ 
                id: doc.id, 
                ...data,
                // Converter timestamp do Firebase para Date de forma segura
                dataCriacao: data.dataCriacao?.toDate ? data.dataCriacao.toDate() : new Date(),
                // Garantir que todos os campos existam
                servicoNome: data.servicoNome || 'Serviço não especificado',
                pet: data.pet || 'Pet não especificado',
                data: data.data || '',
                hora: data.hora || '',
                observacoes: data.observacoes || '',
                status: data.status || 'pendente'
              });
            });
            
            console.log('Agendamentos processados:', agendamentosData);
            setAgendamentos(agendamentosData);
            setLoading(false);
            setError('');
          },
          (error) => {
            console.error('Erro ao buscar agendamentos:', error);
            setError('Erro ao carregar agendamentos. Verifique o console para mais detalhes.');
            setLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error('Erro no fetchAgendamentos:', error);
        setError('Erro ao carregar agendamentos. Verifique o console.');
        setLoading(false);
      }
    };

    const unsubscribe = fetchAgendamentos();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser]);

  const cancelarAgendamento = async (agendamentoId) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      await updateDoc(doc(db, 'agendamentos', agendamentoId), {
        status: 'cancelado',
        dataCancelamento: new Date()
      });
      alert('Agendamento cancelado com sucesso!');
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento. Tente novamente.');
    }
  };

  const excluirAgendamento = async (agendamentoId) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'agendamentos', agendamentoId));
      alert('Agendamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      alert('Erro ao excluir agendamento. Tente novamente.');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'Data não informada';
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch (error) {
      return 'Data inválida';
    }
  };

  const formatarDataHora = (timestamp) => {
    if (!timestamp) return 'Data não informada';
    try {
      return timestamp.toLocaleDateString('pt-BR') + ' às ' + timestamp.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmado':
        return styles.statusConfirmado;
      case 'pendente':
        return styles.statusPendente;
      case 'cancelado':
        return styles.statusCancelado;
      case 'concluido':
        return styles.statusConcluido;
      default:
        return styles.statusPendente;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      case 'concluido':
        return 'Concluído';
      default:
        return status || 'Pendente';
    }
  };

  // Debug: verificar se há agendamentos
  console.log('Agendamentos state:', agendamentos);

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.alert}>
          <h2>🔒 Acesso Restrito</h2>
          <p>Você precisa fazer login para visualizar seus agendamentos.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando seus agendamentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>❌ Erro</h2>
          <p>{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📅 Meus Agendamentos</h1>
        <p>Gerencie todos os agendamentos do seu pet</p>
        
        {/* Botão de debug - remove depois */}
        <button 
          onClick={() => console.log('Agendamentos:', agendamentos)}
          style={{ background: '#ccc', padding: '5px', fontSize: '12px' }}
        >
          Debug Console
        </button>
      </div>

      {agendamentos.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <h2>Nenhum agendamento encontrado</h2>
          <p>Você ainda não possui agendamentos. Que tal agendar um serviço para seu pet?</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/agendamento'}
          >
            Fazer Agendamento
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.agendamentosList}>
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className={styles.agendamentoCard}>
                <div className={styles.cardHeader}>
                  <h3>{agendamento.servicoNome}</h3>
                  <span className={`${styles.status} ${getStatusStyle(agendamento.status)}`}>
                    {getStatusText(agendamento.status)}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <strong>🐾 Pet:</strong>
                      <span>{agendamento.pet}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>📅 Data:</strong>
                      <span>{formatarData(agendamento.data)}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>⏰ Horário:</strong>
                      <span>{agendamento.hora}</span>
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div className={styles.observacoes}>
                      <strong>📝 Observações:</strong>
                      <p>{agendamento.observacoes}</p>
                    </div>
                  )}

                  <div className={styles.metaInfo}>
                    <small>
                      Criado em: {formatarDataHora(agendamento.dataCriacao)}
                    </small>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  {agendamento.status === 'pendente' && (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => cancelarAgendamento(agendamento.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                  
                  {(agendamento.status === 'cancelado' || agendamento.status === 'concluido') && (
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => excluirAgendamento(agendamento.id)}
                    >
                      Excluir
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => console.log('Editar agendamento:', agendamento.id)}
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{agendamentos.length}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {agendamentos.filter(a => a.status === 'pendente').length}
              </span>
              <span className={styles.statLabel}>Pendentes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {agendamentos.filter(a => a.status === 'confirmado').length}
              </span>
              <span className={styles.statLabel}>Confirmados</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}