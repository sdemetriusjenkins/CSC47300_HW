import { useState, useEffect } from 'react';

export const useHamburgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.style.marginTop = isMenuOpen ? '190px' : '0';
        }
    }, [isMenuOpen]);

    return {
        isMenuOpen,
        toggleMenu
    };
};