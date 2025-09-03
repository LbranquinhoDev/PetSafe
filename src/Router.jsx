import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Agendamento from './pages/Agendamento';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />      
                <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
                <Route path="/agendamento" element={<Agendamento/>} />        
            </Routes>
                
        </Router>

    );
    };
export default AppRouter;
