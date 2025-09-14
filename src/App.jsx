import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { inicializeData } from './utils/InicialData';
import LayoutPadrao from './components/LayoutPadrao';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Sobre from './pages/Sobre/Sobre';
import Agendamento from './pages/Agendamento/Agendamento';
import Cadastro from './pages/Cadastro';
import Profile from "./pages/Profile/Profile";
import MeusAgendamentos from './pages/MeusAgendamentos/MeusAgendamentos';
import Planos from './pages/Planos/Planos';
// Inicializar dados
inicializeData();

function App() {
  return (
    <Router>
      <AuthProvider>
        <LayoutPadrao>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
            <Route path="/planos" element={<Planos />} />

            {/* Remova ou comente a rota admin se não for usar ainda */}
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </LayoutPadrao>
      </AuthProvider>
    </Router>
  );
}

export default App;