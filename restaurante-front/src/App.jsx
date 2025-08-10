// src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Pos from './components/Pos';
import Cocina from './components/Cocina';
import './index.css'; // Mantenemos los estilos globales

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Terminal de Pedidos</Link>
        <Link to="/cocina">Pantalla de Cocina</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Pos />} />
        <Route path="/cocina" element={<Cocina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;