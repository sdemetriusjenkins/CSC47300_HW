import { useEffect } from 'react';

export const useVideo = (videoRef) => {
    useEffect(() => {
        const video = videoRef.current;
        
        const handleFade = () => {
            video.classList.add('fade-out');
            setTimeout(() => video.classList.remove('fade-out'), 1000);
        };

        const handleTimeUpdate = () => {
            if (video.currentTime >= video.duration - 1) handleFade();
        };

        const handleClick = () => {
            video.paused ? video.play() : video.pause();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('click', handleClick);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('click', handleClick);
        };
    }, [videoRef]);
};