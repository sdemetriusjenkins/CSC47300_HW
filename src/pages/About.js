import React from 'react';

const About = () => {
    return (
        <div className="page-content">
            <section className="about">
                <div className="about-content">
                    <h1>Our Story</h1>
                    <p>
                        Welcome to <strong>Sea Eats</strong>, where the ocean meets your plate. Our journey began in 2010, when our founder, <strong>Sean Jenkins</strong>, a lifelong seafood enthusiast, decided to bring the flavors of the sea to the heart of the city. Growing up in a small coastal town, Marco developed a deep appreciation for fresh, sustainably sourced seafood. His dream was to create a restaurant that not only served delicious dishes but also celebrated the beauty and bounty of the ocean.
                    </p>
                    <p>
                        At Sea Eats, we believe in the power of simplicity. Our menu is a tribute to the freshest ingredients, prepared with care and respect for tradition. From our signature <strong>Grilled Lobster Tail</strong> to the rich and comforting <strong>New England Clam Chowder</strong>, every dish tells a story of passion and dedication.
                    </p>
                    <p>
                        Sustainability is at the core of our mission. We partner with local fishermen and suppliers who share our commitment to preserving marine ecosystems. By choosing Sea Eats, you're not just enjoying a meal—you're supporting a healthier planet.
                    </p>
                    <p>
                        Join us for an unforgettable dining experience, where every bite takes you closer to the sea.
                    </p>
                </div>
                <div className="about-image">
                    <img src={`${process.env.PUBLIC_URL}/images/about.png`} alt="Sea Eats Restaurant" />
                </div>
            </section>
        </div>
    );
};

export default About;