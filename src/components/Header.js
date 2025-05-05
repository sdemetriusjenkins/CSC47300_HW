import React from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import { useHamburgerMenu } from '../hooks/useHamburgerMenu';

const Header = () => {
    const { isMenuOpen, toggleMenu } = useHamburgerMenu();

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/images/sea_eats_logo.svg`} alt="Sea Eats Logo" />
                </Link>
            </div>
            <nav>
                <ul className={isMenuOpen ? 'unfolded' : ''}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <CartSidebar />
                </ul>
                <div 
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </div>
            </nav>
        </header>
    );
};

export default Header;