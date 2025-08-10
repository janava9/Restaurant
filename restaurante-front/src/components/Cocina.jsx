// src/components/Cocina.jsx (modificación completa)
import React, { useState, useEffect } from 'react'; // Agregamos useEffect
import axios from 'axios'; // Necesitamos Axios para la petición
import './Cocina.css';

const API_URL = 'http://localhost:5062/api/Pedidos'; // URL base de la API, asegúrate de que sea la correcta

const Cocina = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPedidos = async () => {
        try {
            const response = await axios.get(`${API_URL}/pedidos`);
            setPedidos(response.data);
        } catch (error) {
            console.error('Error al cargar los pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []); // El array vacío asegura que se ejecuta solo una vez al cargar el componente

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
                <div key={pedido.pedidoId} className="comanda-card">
                    <h4>Pedido #{pedido.pedidoId}</h4>
                    <p>Cliente: {pedido.nombreCliente}</p>
                    <ul className="comanda-items">
                        {pedido.items.map((item, index) => (
                            <li key={index}>{item.nombreProducto} x{item.cantidad}</li>
                        ))}
                    </ul>
                    <div className="comanda-acciones">
                        {estado === 'En Proceso' && (
                            <button className="btn-primary" onClick={() => moverPedido(pedido.pedidoId, 'Terminado')}>Terminado</button>
                        )}
                        {estado === 'Terminado' && (
                            <button className="btn-success" onClick={() => moverPedido(pedido.pedidoId, 'Entregado')}>Entregado</button>
                        )}
                    </div>
                </div>
            ))
    );

    if (loading) {
        return <div>Cargando pedidos...</div>;
    }

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