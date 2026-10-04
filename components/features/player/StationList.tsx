"use client";

import listRadio from "@/RadioList.json";
import type { ChannelModel } from "@/models/MainModel";

type StationListProps = {
  currentUrlPart: string;
  onSelect: (channel: ChannelModel) => void;
};

const StationList = ({ currentUrlPart, onSelect }: StationListProps) => {
  return (
    <ul className="player-stations" aria-label="Channels">
      {listRadio.map((station) => {
        const current = station.urlPart === currentUrlPart;
        return (
          <li key={station.urlPart}>
            <button
              type="button"
              className="station-button"
              aria-current={current ? "true" : undefined}
              onClick={() => onSelect(station)}
            >
              {station.channel}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default StationList;
