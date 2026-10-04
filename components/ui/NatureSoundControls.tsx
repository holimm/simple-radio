"use client";

import clsx from "clsx";
import RangeInput from "@/components/ui/RangeInput";
import Container from "@/components/layout/Container";

type NatureSoundControlsProps = {
  src: string;
  alt: string;
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  screenWidth: number;
};

const NatureSoundControls = ({
  src,
  alt,
  handleVolume,
  screenWidth,
}: NatureSoundControlsProps) => {
  return (
    <Container
      width="fit"
      height="fit"
      className={clsx(
        "float-left mx-3",
        screenWidth < 1280 && "flex justify-center items-center"
      )}
    >
      <img className={`w-8 h-8 mr-5 xl:mx-auto`} src={src} alt={alt}></img>
      <RangeInput onChange={handleVolume} className="w-[2rem] md:w-[8rem]" />
    </Container>
  );
};

export default NatureSoundControls;
