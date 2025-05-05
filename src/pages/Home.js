import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useVideo } from '../hooks/useVideo';

const Home = () => {
    const videoRef = useRef(null);
    useVideo(videoRef);

    return (
        <div className="home-page">
            <div className="page-content">
                <section className="hero">
                    <div className="video-wrapper">
                        <video 
                            ref={videoRef}
                            id="hero-video" 
                            autoPlay 
                            muted 
                            loop
                        >
                            <source 
                                src={`${process.env.PUBLIC_URL}/videos/restaurant_banner_vid.mp4`} 
                                type="video/mp4" 
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="hero-content">
                        <div className="welcome-message">
                            <span>Welcome To</span>
                            <img 
                                src={`${process.env.PUBLIC_URL}/images/sea_eats_logo_alt.svg`} 
                                alt="Sea Eats Logo" 
                            />
                        </div>
                        <Link to="/menu" className="btn">Explore Our Menu</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;