import React from "react";
import './VideoPlayer.css';

const VideoPlayer = ({ videoId }) => {
    
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-responsive">
            <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/-lrJjWO10OY?si=dIaezxYyN7XsC11I" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
            </iframe>
        </div>
    );
}

export default VideoPlayer;