import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });

        // Create and show notification
        const overlay = document.createElement('div');
        overlay.className = 'notification-overlay';
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';
        messageDiv.innerHTML = `<strong>Message Sent!</strong><br>Thank you for contacting us.`;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'notification-buttons';
        
        const okButton = document.createElement('button');
        okButton.className = 'notification-button view-cart-button';
        okButton.textContent = 'OK';
        
        buttonsDiv.appendChild(okButton);
        notification.appendChild(messageDiv);
        notification.appendChild(buttonsDiv);
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        // Show notification with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            notification.classList.add('show');
        });

        // Handle button click
        okButton.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="page-content">
            <section className="contact">
                <h1>Contact Us</h1>
                {/* Contact Information */}
                <div className="contact-info">
                    <p><strong>Address:</strong> 412 Neighborhood Road, Mastic Beach, NY 11951</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Email:</strong> info@seaeats.com</p>
                    <p><strong>Business Hours:</strong></p>
                    <ul>
                        <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
                        <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
                    </ul>
                </div>
                {/* Contact Container (Map and Form) */}
                <div className="contact-container">
                    {/* Google Map */}
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d599.1236719351924!2d-72.85911561143581!3d40.761821545469004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8505bf460b1e3%3A0x183837d92deeca70!2s412%20Neighborhood%20Rd%2C%20Mastic%20Beach%2C%20NY%2011951!5e0!3m2!1sen!2sus!4v1742112292882!5m2!1sen!2sus"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Restaurant Location"
                        ></iframe>
                    </div>
                    {/* Contact Form */}
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;