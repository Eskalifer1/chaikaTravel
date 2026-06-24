"use client";

interface StepperProps {
  /** Accessible label for the stepper */
  label: string;

  /** Current value */
  value: number;

  /** Minimum allowed value */
  min: number;

  /** Maximum allowed value */
  max: number;

  /** Called with the new value when increment or decrement is clicked */
  onChange: (next: number) => void;
}

export default function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="flex h-8 w-8 items-center justify-center rounded-radius-md border border-border text-text-primary transition hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          –
        </button>
        <span className="w-6 text-center text-sm tabular-nums text-text-primary">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
          className="flex h-8 w-8 items-center justify-center rounded-radius-md border border-border text-text-primary transition hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}
