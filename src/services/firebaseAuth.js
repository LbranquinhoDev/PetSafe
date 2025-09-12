// src/services/firebaseAuth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const firebaseAuth = {

  // CADASTRAR USUÁRIO
  async register(userData) {
    try {
      console.log('1. Criando usuário na autenticação...', userData.email);
      
      // 1. Criar usuário na autenticação
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;
      console.log('2. Usuário criado com sucesso:', user.uid);

      // 2. Salvar dados adicionais no Firestore
      console.log('3. Salvando dados no Firestore...');
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: userData.email,
        telefone: userData.telefone || '',
        endereco: userData.endereco || '',
        petName: userData.petName || '',
        petType: userData.petType || '',
        petBreed: userData.petBreed || '',
        createdAt: new Date().toISOString(),
        role: 'user'
      });

      console.log('4. Dados salvos no Firestore com sucesso');

      // 3. Atualizar perfil com nome
      console.log('5. Atualizando perfil...');
      await updateProfile(user, {
        displayName: userData.name
      });

      console.log('6. Perfil atualizado com sucesso');
      
      return { 
        success: true, 
        user: {
          uid: user.uid,
          email: user.email,
          name: userData.name,
        }
      };
      
    } catch (error) {
      console.error('ERRO no registro:', error.code, error.message);
      return { 
        success: false, 
        message: this.getErrorMessage(error.code) 
      };
    }
  },

  // LOGIN
  async login(email, password) {
    try {
      console.log('Tentando login...', email);
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log('Login bem-sucedido:', user.uid, user.email);
      
      return { 
        success: true, 
        user: {
          uid: user.uid,
          email: user.email,
          name: user.displayName
        }
      };
      
    } catch (error) {
      console.error('ERRO no login:', error.code, error.message);
      return { 
        success: false, 
        message: this.getErrorMessage(error.code) 
      };
    }
  },

  // LOGOUT
  async logout() {
    try {
      await signOut(auth);
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw new Error('Erro ao fazer logout');
    }
  },

  // TRADUZIR MENSAGENS DE ERRO
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/email-already-in-use': 'Email já cadastrado. Faça login ou use outro email.',
      'auth/invalid-email': 'Email inválido. Verifique o formato.',
      'auth/operation-not-allowed': 'Operação não permitida.',
      'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
      'auth/user-disabled': 'Esta conta foi desativada.',
      'auth/user-not-found': 'Usuário não encontrado. Verifique o email.',
      'auth/wrong-password': 'Senha incorreta. Tente novamente.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.'
    };

    return errorMessages[errorCode] || 'Erro desconhecido. Tente novamente.';
  }
};