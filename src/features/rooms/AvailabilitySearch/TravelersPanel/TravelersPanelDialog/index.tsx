"use client";

import { type Ref } from "react";

import { MAX_ADULTS, MAX_ROOMS } from "@/constants/search";

import XIcon from "@/components/Icons/XIcon";
import Portal from "@/components/Portal";

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

function Stepper({ label, value, min, max, onChange }: StepperProps) {
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

interface TravelersPanelDialogProps {
  /** Ref forwarded to the dialog root div, used for outside-click detection */
  ref: Ref<HTMLDivElement>;

  /** Number of rooms */
  rooms: number;

  /** Number of adults */
  adults: number;

  /** Ages of each child */
  childAges: number[];

  /** Called when rooms count changes */
  onRoomsChange: (v: number) => void;

  /** Called when adults count changes */
  onAdultsChange: (v: number) => void;

  /** Called when a child age changes */
  onChildAgeChange: (index: number, age: number) => void;

  /** Called to add a new child */
  onAddChild: () => void;

  /** Whether adding another child is allowed (respects MAX_CHILDREN limit) */
  canAddChild: boolean;

  /** Called to remove a child by index */
  onRemoveChild: (index: number) => void;

  /** Error message for child ages, if any */
  childAgesError: string | undefined;

  /** Bounding rect of the trigger button, used to position the dialog */
  anchorRect: DOMRect;
}

export default function TravelersPanelDialog({
  ref,
  rooms,
  adults,
  childAges,
  onRoomsChange,
  onAdultsChange,
  onChildAgeChange,
  onAddChild,
  canAddChild,
  onRemoveChild,
  childAgesError,
  anchorRect,
}: TravelersPanelDialogProps) {
  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 8,
    right: `calc(100vw - ${anchorRect.right}px)`,
    zIndex: 9999,
  };

  return (
    <Portal>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="travelers-panel-title"
        style={style}
        className="w-72 rounded-radius-lg border border-border bg-surface p-4 shadow-lg"
      >
        <span id="travelers-panel-title" className="sr-only">
          Configure rooms and travelers
        </span>
        <div className="flex flex-col gap-4">
          <Stepper label="Rooms" value={rooms} min={1} max={MAX_ROOMS} onChange={onRoomsChange} />
          <Stepper
            label="Adults"
            value={adults}
            min={1}
            max={MAX_ADULTS}
            onChange={onAdultsChange}
          />

          <div className="flex flex-col gap-2 border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Children</span>
              <button
                type="button"
                onClick={onAddChild}
                disabled={!canAddChild}
                className="text-xs font-semibold text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Add child
              </button>
            </div>

            {childAges.length > 0 && (
              <ul className="flex flex-col gap-2">
                {childAges.map((age, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <label
                      htmlFor={`child-age-${i}`}
                      className="flex-1 text-sm text-text-secondary"
                    >
                      Child {i + 1} age
                    </label>
                    <select
                      id={`child-age-${i}`}
                      value={age}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        if (!isNaN(parsed)) {
                          onChildAgeChange(i, parsed);
                        }
                      }}
                      className="w-16 rounded-radius-md border border-border bg-surface px-2 py-1 text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {Array.from({ length: 18 }, (_, n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => onRemoveChild(i)}
                      aria-label={`Remove child ${i + 1}`}
                      className="text-text-secondary hover:text-destructive"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {childAgesError && (
              <p role="alert" className="text-xs text-destructive">
                {childAgesError}
              </p>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
