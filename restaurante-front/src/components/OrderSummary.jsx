// src/components/OrderSummary.jsx

import React from 'react';

const OrderSummary = ({ order, onUpdateQuantity, onFinishOrder }) => {
    const total = Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="order-summary">
            <h2>Comanda</h2>
            <ul className="order-list">
                {Object.keys(order).length === 0 ? (
                    <p>No hay productos en el pedido.</p>
                ) : (
                    Object.values(order).map(item => (
                        <li key={item.id} className="order-item">
                            <span>{item.name} x{item.quantity}</span>
                            <div className="quantity-controls">
                                <button className="quantity-button remove" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                                <button className="quantity-button" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button className="finish-order-btn" onClick={onFinishOrder}>Finalizar Pedido</button>
        </div>
    );
};

export default OrderSummary;