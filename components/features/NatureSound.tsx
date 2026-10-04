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
    <>
      <ReactPlayer
        className="react-player !opacity-0"
        src={`https://www.youtube.com/watch?v=${url}`}
        width={"100%"}
        height={"100vh"}
        controls={false}
        playing={play}
        loop={true}
        volume={volume}
        muted={mute}
      />
    </>
  );
};

export default NatureSound;
