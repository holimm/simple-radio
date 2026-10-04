"use client";

import RangeInput from "@/components/ui/RangeInput";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";

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
      <Container width="fit" height="fit" className="md:-rotate-90 float-right">
        <RangeInput
          onChange={onChange}
          max={max}
          className="w-[6rem] md:w-[10rem] mr-5 md:mr-0"
        />
      </Container>
      <Container
        width="fit"
        height="fit"
        position="absolute"
        className="text-white text-center float-right right-[8rem] md:right-[6rem]"
      >
        <img className="w-8 h-8" src={icon} alt="BrightnessIcon"></img>
      </Container>
    </>
  );

  if (hiddenOnMd) {
    return (
      <Container
        width="full"
        position="relative"
        className="h-14 md:hidden"
      >
        <Flex width="full" height="full" justify="end" align="center">
          {control}
        </Flex>
      </Container>
    );
  }

  return (
    <Flex
      width="full"
      justify="end"
      align="center"
      position="relative"
      className="h-14 md:h-20"
    >
      <Container width="fit" height="fit">
        {control}
      </Container>
    </Flex>
  );
};

export default IconRangeControl;
