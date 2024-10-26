"use client";

import React, { useRef } from "react";

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width = 280,
  height = 280,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reinicia el video al inicio
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        width={width}
        height={height}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        muted
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
