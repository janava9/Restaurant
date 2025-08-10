// src/components/Menu.jsx

import React from 'react';

const menuData = [
    { id: 'hamburguesa1', name: 'Hamburguesa Clásica', price: 120.00, category: 'Platillos' },
    { id: 'hamburguesa2', name: 'Hamburguesa con Queso', price: 135.50, category: 'Platillos' },
    { id: 'papas1', name: 'Papas Fritas', price: 50.00, category: 'Acompañamientos' },
    { id: 'coca', name: 'Coca-Cola', price: 30.00, category: 'Bebidas' },
    { id: 'sprite', name: 'Sprite', price: 30.00, category: 'Bebidas' },
    { id: 'te', name: 'Té Helado', price: 40.00, category: 'Bebidas' },
    { id: 'brownie', name: 'Brownie con Nieve', price: 75.00, category: 'Postres' }
];

const Menu = ({ onAddItem }) => {
    return (
        <div className="menu">
            {menuData.map(item => (
                <div 
                    key={item.id} 
                    className="menu-item" 
                    onClick={() => onAddItem(item)}>
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default Menu;