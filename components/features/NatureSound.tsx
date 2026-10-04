"use client";

import ReactPlayer from "react-player";

type NatureSoundProps = {
  volume: number;
  mute: boolean;
  play: boolean;
  url: string;
};

const NatureSound = ({ volume, mute, play, url }: NatureSoundProps) => {
  return (
    <div className="player-nature" aria-hidden="true">
      <ReactPlayer
        className="react-player"
        src={`https://www.youtube.com/watch?v=${url}`}
        width="100%"
        height="100%"
        controls={false}
        playing={play}
        loop={true}
        volume={volume}
        muted={mute}
      />
    </div>
  );
};

export default NatureSound;
