import React from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  /** Label text — always rendered, visually hidden only when `labelHidden` is true */
  label: string;

  /** When true the label is visually hidden but still accessible to screen readers */
  labelHidden?: boolean;

  /** Error message displayed below the input; also sets aria-invalid */
  error?: string;

  /** Leading icon rendered inside the input on the left side */
  leadingIcon?: React.ReactNode;

  /** Trailing action rendered inside the input on the right side (e.g. clear button) */
  trailingAction?: React.ReactNode;

  /** Ref forwarded to the underlying <input> element */
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  label,
  labelHidden = false,
  error,
  leadingIcon,
  trailingAction,
  className,
  id,
  ref,
  ...rest
}: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={labelHidden ? "sr-only" : "text-sm font-medium leading-none text-text-primary"}
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {leadingIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 flex items-center text-text-secondary"
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={[
            "w-full rounded-radius-md border border-border bg-surface px-3 py-2 text-sm text-text-primary",
            "placeholder:text-text-disabled",
            "outline-none transition-colors",
            "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
              : "",
            leadingIcon ? "pl-9" : "",
            trailingAction ? "pr-9" : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />

        {trailingAction && (
          <span className="absolute right-2 flex items-center">{trailingAction}</span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
