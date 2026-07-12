"use client";

interface PercentageInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export default function PercentageInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 0.1,
  helpText,
}: PercentageInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (isNaN(val)) return;
    let finalVal = val;
    if (max !== undefined && finalVal > max) finalVal = max;
    if (finalVal < min) finalVal = min;
    onChange(finalVal);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor={id} className="font-mono text-[11px] uppercase font-bold text-foreground">
        {label}
      </label>
      
      <div className="flex border border-border bg-background focus-within:ring-1 focus-within:ring-black">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value !== undefined ? value : ""}
          onChange={handleChange}
          className="w-full p-2.5 bg-transparent font-mono text-xs focus:outline-none border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        
        <span className="flex items-center px-3 border-l border-border bg-secondary font-mono text-xs font-bold text-muted-foreground select-none">
          %
        </span>
      </div>

      {helpText && (
        <span className="text-[10px] text-muted-foreground leading-normal italic">
          {helpText}
        </span>
      )}
    </div>
  );
}
