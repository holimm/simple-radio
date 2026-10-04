"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import listRadio from "@/RadioList.json";
import { ChannelModel } from "@/models/MainModel";
import RangeInput from "@/components/ui/RangeInput";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Section from "@/components/layout/Section";

registerGSAP();

type ChannelPickerProps = {
  genre: string;
  handleGenreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeChannel: (channel: ChannelModel) => void;
};

const ChannelPicker = ({
  genre,
  handleGenreChange,
  changeChannel,
}: ChannelPickerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panelRef.current, { x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          panelRef.current,
          { x: -450 },
          { x: 0, duration: 1.6, delay: 0.8, ease: "power1.inOut" }
        );
      });
    },
    { scope: panelRef }
  );

  return (
    <Container
      ref={panelRef}
      width="7/12"
      height="full"
      className="md:w-5/12 lg:w-3/12 float-left"
    >
      <Flex
        width="fit"
        justify="center"
        align="center"
        centered
        className="py-2 h-20 text-white after:bg-rose-500 rounded-full appearance-none focus:ring-0 cursor-pointer"
      >
        <Container width="fit" className="float-left ml-5">
          <p
            className="text-center text-white text-2xl"
            style={{ fontFamily: "Barlow Condensed" }}
          >
            {genre}
          </p>
          <RangeInput onChange={handleGenreChange} max={4} />
        </Container>
      </Flex>
      <Section
        width="full"
        overflow="x-hidden"
        className="h-3/4 mt-0 md:mt-3 float-right overflow-w-0"
      >
        {listRadio
          .filter((condition) => {
            return condition.type === genre;
          })
          .map((items, key) => {
            return (
              <div
                key={key}
                className="transition-transform duration-200 ease-in-out hover:scale-[1.2] active:scale-[0.8]"
              >
                <div
                  onClick={() => changeChannel(items)}
                  className="my-4 cursor-pointer"
                  style={{ fontFamily: "Barlow Condensed" }}
                >
                  <Flex
                    justify="start"
                    align="center"
                    className="ml-2 lg:ml-16 mr-8"
                  >
                    <img
                      className="h-4 w-4"
                      src="/image/icon/play.svg"
                      alt="ReturnIcon"
                    />
                    <p className="text-xl ml-5 text-white truncate">
                      {items.channel}
                    </p>
                  </Flex>
                </div>
              </div>
            );
          })}
      </Section>
    </Container>
  );
};
export default ChannelPicker;
