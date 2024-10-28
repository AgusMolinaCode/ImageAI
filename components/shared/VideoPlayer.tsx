"use client";

import React from "react";

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
  return (
    <div className="video-container">
      <video
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;