// src/components/Pos.jsx

import React, { useState } from 'react';
import Menu from './Menu';
import OrderSummary from './OrderSummary';
import axios from 'axios';
import '../index.css'; // Asegúrate de que los estilos globales estén importados

// Asegúrate de que esta URL sea la correcta para tu API
const API_URL = 'http://localhost:5062/api/Pedidos/crear'; 

function Pos() {
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState(null);

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
      {orderId && (
        <div className="order-confirmation">
          <h3>¡Pedido #{orderId} enviado con éxito!</h3>
        </div>
      )}
    </>
  );
}

export default Pos;