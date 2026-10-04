"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import listRadio from "@/radioList.json";
import { ChannelModel } from "@/models/mainModel";
import RangeInput from "@/components/ui/rangeInput";

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
    <div
      ref={panelRef}
      className="w-7/12 md:w-5/12 lg:w-3/12 h-full float-left"
    >
      <div className="flex justify-center items-center py-2 w-fit mx-auto h-20 text-white after:bg-rose-500 rounded-full appearance-none focus:ring-0 cursor-pointer">
        <div className="w-fit float-left ml-5">
          <p
            className="text-center text-white text-2xl"
            style={{ fontFamily: "Barlow Condensed" }}
          >
            {genre}
          </p>
          <RangeInput onChange={handleGenreChange} max={4} />
        </div>
      </div>
      <div className="w-full h-3/4 mt-0 md:mt-3 float-right overflow-w-0 overflow-x-hidden">
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
                  <div className="flex justify-start items-center ml-2 lg:ml-16 mr-8">
                    <img
                      className="h-4 w-4"
                      src="/image/icon/play.svg"
                      alt="ReturnIcon"
                    />
                    <p className="text-xl ml-5 text-white truncate">
                      {items.channel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ChannelPicker;
