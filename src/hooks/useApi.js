// src/hooks/useApi.js
import { useLocaldb } from './useLocaldb';

// Hook para gerenciar agendamentos
export const useAgendamentos = () => {
  return useLocaldb('agendamentos');
};

// Hook para gerenciar serviços
export const useServicos = () => {
  return useLocaldb('servicos');
};

// Hook para gerenciar contatos
export const useContatos = () => {
  return useLocaldb('contatos');
};

// Hook para gerenciar usuários
export const useUsuarios = () => {
  return useLocaldb('users');
};

// Hook para gerenciar pets
export const usePets = () => {
  return useLocaldb('pets');
};

// Função para inicializar dados padrão
export const inicializarDadosPadrao = () => {
  // Serviços padrão
  if (!localStorage.getItem('servicos')) {
    const servicosPadrao = [
      {
        id: 1,
        nome: 'Banho',
        descricao: 'Banho completo com produtos de qualidade',
        preco: 30.00,
        duracao: 30,
        categoria: 'Estética'
      },
      {
        id: 2,
        nome: 'Tosa',
        descricao: 'Tosa higiênica ou completa according to raça',
        preco: 40.00,
        duracao: 45,
        categoria: 'Estética'
      },
      {
        id: 3,
        nome: 'Banho e Tosa',
        descricao: 'Combo completo de banho e tosa',
        preco: 60.00,
        duracao: 60,
        categoria: 'Estética'
      },
      {
        id: 4,
        nome: 'Consulta Veterinária',
        descricao: 'Consulta com veterinário especializado',
        preco: 80.00,
        duracao: 30,
        categoria: 'Saúde'
      },
      {
        id: 5,
        nome: 'Vacinação',
        descricao: 'Aplicação de vacinas necessárias',
        preco: 50.00,
        duracao: 15,
        categoria: 'Saúde'
      }
    ];
    localStorage.setItem('servicos', JSON.stringify(servicosPadrao));
  }

  // Usuário admin padrão
  if (!localStorage.getItem('users')) {
    const usuariosPadrao = [
      {
        id: 1,
        nome: 'Administrador',
        email: 'admin@petsafe.com',
        password: 'admin123',
        telefone: '(11) 99999-9999',
        role: 'admin',
        dataCadastro: new Date().toISOString()
      }
    ];
    localStorage.setItem('users', JSON.stringify(usuariosPadrao));
  }
};

// Funções auxiliares para API
export const apiUtils = {
  // Simular delay de API
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Simular requisição API com tratamento de erro
  simularRequisicao: async (acao, dados) => {
    try {
      // Simular delay de rede
      await apiUtils.delay(1000);
      
      // Simular possível erro (10% de chance)
      if (Math.random() < 0.1) {
        throw new Error('Erro de conexão simulado');
      }

      return await acao(dados);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  },

  // Validar email
  validarEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validar telefone
  validarTelefone: (telefone) => {
    const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
  },

  // Formatar data
  formatarData: (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  },

  // Formatar hora
  formatarHora: (horaString) => {
    return horaString.substring(0, 5);
  },

  // Gerar ID único
  gerarId: () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }
};

// Exportar tudo como padrão
export default {
  useAgendamentos,
  useServicos,
  useContatos,
  useUsuarios,
  usePets,
  inicializarDadosPadrao,
  apiUtils
};