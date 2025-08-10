// src/App.jsx

import { useState } from 'react';
import axios from 'axios'; // Necesitaremos esta librería para hacer peticiones HTTP
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import './index.css';
// src/App.jsx
import Cocina from './components/Cocina';

// URL de nuestra API de backend
//const API_URL = 'https://localhost:5062/api/Pedidos/crear';
const API_URL = 'http://localhost:5062/api/Pedidos/crear';

function App() {
    // ... la lógica del estado del pedido ya no se usa, pero sigue ahí ...

    return (
        // Ahora, solo se renderiza el componente Cocina
        <Cocina />
    );
}

export default App;