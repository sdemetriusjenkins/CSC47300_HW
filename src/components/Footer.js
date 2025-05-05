import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-restaurant-name">
          <span>Sea Eats</span>
        </div>
        <div className="footer-info">
          <h3>Contact Us</h3>
          <p>412 Neighborhood Rd, Mastic Beach, NY 11951</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@seaeats.com</p>
        </div>
        <div className="footer-hours">
          <h3>Business Hours</h3>
          <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2025 Sea Eats. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;