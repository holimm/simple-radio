"use client";

import ReactPlayer from "react-player";

type VideoPlayerProps = {
  className: string;
  height: string;
  width: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  urlPart: string;
};

const VideoPlayer = ({
  className,
  height,
  width,
  playing,
  volume,
  muted,
  urlPart,
}: VideoPlayerProps) => {
  return (
    <ReactPlayer
      className={className}
      src={`https://www.youtube.com/watch?v=${urlPart}`}
      config={{ youtube: { rel: 0 } }}
      height={height}
      width={width}
      controls={false}
      playing={playing}
      loop={true}
      volume={volume}
      muted={muted}
    />
  );
};

export default VideoPlayer;
