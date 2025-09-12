// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth,db } from '../firebase/config';
import { firebaseAuth } from '../services/firebaseAuth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider iniciando...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Estado de autenticação mudou:', firebaseUser);
      
      if (firebaseUser) {
        try {
          // Buscar dados adicionais do Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || userData.name,
              ...userData
            });
            console.log('Usuário carregado do Firestore:', userData.name);
          } else {
            // Se não encontrou no Firestore, usa dados básicos
            setCurrentUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'Usuário'
            });
            console.log('Usuário carregado (dados básicos):', firebaseUser.email);
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'Usuário'
          });
        }
      } else {
        setCurrentUser(null);
        console.log('Nenhum usuário logado');
      }
      
      setLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log('Tentando login com:', email);
    setLoading(true);
    try {
      const result = await firebaseAuth.login(email, password);
      console.log('Resultado do login:', result);
      return result;
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: error.message || 'Erro no login' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    console.log('Tentando registrar:', userData);
    setLoading(true);
    try {
      const result = await firebaseAuth.register(userData);
      console.log('Resultado do registro:', result);
      return result;
    } catch (error) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        message: error.message || 'Erro no cadastro' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Fazendo logout...');
      await firebaseAuth.logout();
      setCurrentUser(null);
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};