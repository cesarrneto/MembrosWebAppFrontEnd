import React from 'react';
import './Menu.css';
import tocha from './tocha.png'

function Menu() {
    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <div className="header-menu">
            <div onClick={() => handleNavigation('/home')}><img src={tocha} alt="Logo ICERJB Tocha" className="tocha" /></div>
            <div className="menu-items">
                <p onClick={() => handleNavigation('/membros')}>Membros</p>
                <p onClick={() => handleNavigation('/')}>Entrar</p>
            </div>
        </div>
    );
}

export default Menu;
