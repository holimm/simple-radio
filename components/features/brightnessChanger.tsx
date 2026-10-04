"use client";

import RangeInput from "@/components/ui/rangeInput";

type BrightnessChangerProps = {
  handleBrightness: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BrightnessChanger = ({ handleBrightness }: BrightnessChangerProps) => {
  return (
    <div className="h-14 md:h-20 w-full flex justify-end items-center relative">
      <div className="h-fit w-fit">
        <div className="h-fit w-fit md:-rotate-90 float-right">
          <RangeInput
            onChange={handleBrightness}
            className="w-[6rem] md:w-[10rem] mr-5 md:mr-0"
          />
        </div>
        <div className="h-fit w-fit text-white text-center float-right absolute right-[8rem] md:right-[6rem]">
          <img
            className="w-8 h-8"
            src="/image/icon/brightness.svg"
            alt="BrightnessIcon"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default BrightnessChanger;
