// src/components/Cocina.jsx

import React, { useState } from 'react';
import './Cocina.css'; // Crearemos este archivo en el siguiente paso

const mockPedidos = [
    { 
        id: '1', 
        cliente: 'Juan Pérez', 
        telefono: '55-1234-5678', 
        estado: 'En Proceso', 
        items: [{ nombre: 'Hamburguesa Clásica', cantidad: 2 }, { nombre: 'Papas Fritas', cantidad: 1 }] 
    },
    { 
        id: '2', 
        cliente: 'Cliente de Mostrador', 
        telefono: 'N/A', 
        estado: 'Terminado', 
        items: [{ nombre: 'Coca-Cola', cantidad: 1 }, { nombre: 'Papas Gajo', cantidad: 1 }] 
    },
    { 
        id: '3', 
        cliente: 'María López', 
        telefono: '55-8765-4321', 
        estado: 'En Proceso', 
        items: [{ nombre: 'Hamburguesa con Queso', cantidad: 1 }] 
    },
];

const Cocina = () => {
    const [pedidos, setPedidos] = useState(mockPedidos);

    const moverPedido = (id, nuevoEstado) => {
        setPedidos(prevPedidos => 
            prevPedidos.map(pedido =>
                pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
            )
        );
    };

    const renderPedidos = (estado) => (
        pedidos
            .filter(pedido => pedido.estado === estado)
            .map(pedido => (
                <div key={pedido.id} className="comanda-card">
                    <h4>Pedido #{pedido.id}</h4>
                    <p>Cliente: {pedido.cliente}</p>
                    <ul className="comanda-items">
                        {pedido.items.map((item, index) => (
                            <li key={index}>{item.nombre} x{item.cantidad}</li>
                        ))}
                    </ul>
                    <div className="comanda-acciones">
                        {estado === 'En Proceso' && (
                            <button className="btn-primary" onClick={() => moverPedido(pedido.id, 'Terminado')}>Terminado</button>
                        )}
                        {estado === 'Terminado' && (
                            <button className="btn-success" onClick={() => moverPedido(pedido.id, 'Entregado')}>Entregado</button>
                        )}
                    </div>
                </div>
            ))
    );

    return (
        <div className="cocina-container">
            <h1 className="cocina-titulo">Panel de Comandas</h1>
            <div className="cocina-columnas">
                <div className="cocina-columna">
                    <h3>En Proceso</h3>
                    {renderPedidos('En Proceso')}
                </div>
                <div className="cocina-columna">
                    <h3>Terminado</h3>
                    {renderPedidos('Terminado')}
                </div>
                <div className="cocina-columna">
                    <h3>Entregado</h3>
                    {renderPedidos('Entregado')}
                </div>
            </div>
        </div>
    );
};

export default Cocina;