import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Agendamento from './pages/Agendamento';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />      
                <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
                <Route path="/agendamento" element={<Agendamento/>} />    
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
    
            </Routes>
                
        </Router>

    );
    };
export default AppRouter;
