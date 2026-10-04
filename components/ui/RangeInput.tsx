"use client";

type RangeInputProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const RangeInput = ({
  min = 0,
  max = 100,
  defaultValue = 0,
  onChange,
  className,
}: RangeInputProps) => {
  return (
    <input
      type="range"
      onChange={onChange}
      className={
        className
          ? `appearance-none rounded-xl p-0 h-1 bg-slate-100 ${className}`
          : "appearance-none rounded-xl p-0 h-1 bg-slate-100"
      }
      min={min}
      max={max}
      defaultValue={defaultValue}
    />
  );
};

export default RangeInput;
