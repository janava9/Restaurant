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
    const [order, setOrder] = useState({});
    const [finalJson, setFinalJson] = useState(null);

    const handleAddItem = (item) => {
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder };
            if (newOrder[item.id]) {
                newOrder[item.id].quantity += 1;
            } else {
                newOrder[item.id] = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                };
            }
            return newOrder;
        });
    };

    const handleUpdateQuantity = (id, change) => {
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder };
            if (newOrder[id]) {
                newOrder[id].quantity += change;
                if (newOrder[id].quantity <= 0) {
                    delete newOrder[id];
                }
            }
            return newOrder;
        });
    };

    const handleFinishOrder = async () => {
        const pedidoFinal = {
            pedidoId: `POS_${new Date().getTime()}`,
            nombreCliente: 'Cliente de Mostrador',
            telefonoCliente: 'N/A', // Dato no capturado en esta versión, se puede agregar
            items: Object.values(order).map(item => ({
                nombreProducto: item.name,
                cantidad: item.quantity,
            })),
            tipoPedido: "pickup",
            fechaHora: new Date().toISOString(),
        };

        try {
            const response = await axios.post(API_URL, pedidoFinal);
            setFinalJson(JSON.stringify(response.data, null, 2));
            alert('¡Pedido enviado con éxito al backend!');
            setOrder({}); // Limpiar el pedido después de enviarlo
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
            alert('Hubo un error al enviar el pedido. Revisa la consola para más detalles.');
        }
    };

    return (
        <>
            <header>
                <h1>Terminal de Pedidos - Para Llevar</h1>
            </header>
            <div className="container">
                <Menu onAddItem={handleAddItem} />
                <OrderSummary 
                    order={order} 
                    onUpdateQuantity={handleUpdateQuantity} 
                    onFinishOrder={handleFinishOrder} 
                />
            </div>
            {finalJson && (
                <div className="container">
                    <pre className="json-output">
                        {finalJson}
                    </pre>
                </div>
            )}
        </>
    );
}

export default App;