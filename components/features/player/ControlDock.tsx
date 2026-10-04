"use client";

import { useId } from "react";
import RangeInput from "@/components/ui/RangeInput";
import IconButton from "@/components/ui/IconButton";

type ControlDockProps = {
  playing: boolean;
  muted: boolean;
  volume: number;
  rain: number;
  waves: number;
  brightness: number;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolume: (value: number) => void;
  onRain: (value: number) => void;
  onWaves: (value: number) => void;
  onBrightness: (value: number) => void;
};

const levelText = (value: number) =>
  value === 0 ? "Off" : `${Math.round(value * 100)}`;

const ControlDock = ({
  playing,
  muted,
  volume,
  rain,
  waves,
  brightness,
  onPrevious,
  onNext,
  onTogglePlay,
  onToggleMute,
  onVolume,
  onRain,
  onWaves,
  onBrightness,
}: ControlDockProps) => {
  return (
    <div className="player-footer">
      <div className="dock-transport">
        <div className="dock-transport-cluster">
          <IconButton
            size="sm"
            onClick={onPrevious}
            src="/image/icon/prev.svg"
            alt="Previous channel"
          />
          <IconButton
            size="lg"
            onClick={onTogglePlay}
            src={playing ? "/image/icon/pause.svg" : "/image/icon/play.svg"}
            alt={playing ? "Pause" : "Play"}
          />
          <IconButton
            size="sm"
            onClick={onNext}
            src="/image/icon/next.svg"
            alt="Next channel"
          />
        </div>
        <VolumeControl
          muted={muted}
          volume={volume}
          onToggleMute={onToggleMute}
          onVolume={onVolume}
        />
      </div>
      <div className="dock-effects" aria-label="Ambience">
        <SliderField
          label="Rain"
          value={Math.round(rain * 100)}
          valueText={levelText(rain)}
          onChange={(next) => onRain(next / 100)}
        />
        <SliderField
          label="Waves"
          value={Math.round(waves * 100)}
          valueText={levelText(waves)}
          onChange={(next) => onWaves(next / 100)}
        />
        <SliderField
          label="Brightness"
          value={Math.round(brightness * 100)}
          valueText={`${Math.round(brightness * 100)}`}
          onChange={(next) => onBrightness(next / 100)}
        />
      </div>
    </div>
  );
};

type VolumeControlProps = {
  muted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolume: (value: number) => void;
};

const VolumeControl = ({
  muted,
  volume,
  onToggleMute,
  onVolume,
}: VolumeControlProps) => {
  const value = Math.round(volume * 100);
  const valueText = muted || volume === 0 ? "Muted" : `${value}`;

  return (
    <div className="dock-volume">
      <IconButton
        size="sm"
        onClick={onToggleMute}
        src={muted ? "/image/icon/volumeoff.svg" : "/image/icon/volumeon.svg"}
        alt={muted ? "Unmute" : "Mute"}
        className="dock-volume-button"
      />
      <div className="dock-volume-slider">
        <RangeInput
          label="Volume"
          value={value}
          valueText={valueText}
          onChange={(next) => onVolume(next / 100)}
        />
      </div>
    </div>
  );
};

type SliderFieldProps = {
  label: string;
  value: number;
  valueText: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onChange: (value: number) => void;
};

const SliderField = ({
  label,
  value,
  valueText,
  min,
  max,
  step,
  className,
  onChange,
}: SliderFieldProps) => {
  const labelId = useId();

  return (
    <div className={className ? `slider-field ${className}` : "slider-field"}>
      <div className="slider-field-label">
        <span id={labelId}>{label}</span>
        <span aria-hidden="true">{valueText}</span>
      </div>
      <RangeInput
        min={min}
        max={max}
        step={step}
        value={value}
        valueText={valueText}
        labelledBy={labelId}
        onChange={onChange}
      />
    </div>
  );
};

export default ControlDock;
