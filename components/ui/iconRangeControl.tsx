"use client";

import RangeInput from "@/components/ui/rangeInput";

type IconRangeControlProps = {
  icon: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
  hiddenOnMd?: boolean;
};

const IconRangeControl = ({
  icon,
  onChange,
  max = 100,
  hiddenOnMd = false,
}: IconRangeControlProps) => {
  const control = (
    <>
      <div className="h-fit w-fit md:-rotate-90 float-right">
        <RangeInput
          onChange={onChange}
          max={max}
          className="w-[6rem] md:w-[10rem] mr-5 md:mr-0"
        />
      </div>
      <div className="h-fit w-fit text-white text-center float-right absolute right-[8rem] md:right-[6rem]">
        <img className="w-8 h-8" src={icon} alt="BrightnessIcon"></img>
      </div>
    </>
  );

  if (hiddenOnMd) {
    return (
      <div className="h-14 w-full relative md:hidden">
        <div className="h-full w-full flex justify-end items-center">
          {control}
        </div>
      </div>
    );
  }

  return (
    <div className="h-14 md:h-20 w-full flex justify-end items-center relative">
      <div className="h-fit w-fit">{control}</div>
    </div>
  );
};

export default IconRangeControl;
