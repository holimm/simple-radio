"use client";

type RangeInputProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  valueText: string;
  label?: string;
  labelledBy?: string;
  onChange: (value: number) => void;
};

const RangeInput = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  valueText,
  label,
  labelledBy,
  onChange,
}: RangeInputProps) => {
  return (
    <input
      type="range"
      className="range-input"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
};

export default RangeInput;
