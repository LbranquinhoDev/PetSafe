// src/context/UsuariosContext.jsx
import { createContext, useContext } from 'react';

const UsuariosContext = createContext();

export const useUsuarios = () => useContext(UsuariosContext);

export const UsuariosProvider = ({ children }) => {
  const updateItem = async (id, data) => {
    // Lógica de atualização aqui
  };

  const value = {
    updateItem
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
};