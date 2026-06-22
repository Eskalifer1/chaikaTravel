"use client";

// Tailwind is unavailable here — global-error renders when the root layout crashes,
// which means globals.css is never loaded. Styles are applied via inline CSS variables.
const styles = {
  body: {
    margin: 0,
    fontFamily: "sans-serif",
    background: "#f9fafb",
    color: "#111827",
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center" as const,
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
  },
  message: {
    marginTop: "1rem",
    fontSize: "1.125rem",
    color: "#6b7280",
  },
  button: {
    marginTop: "2rem",
    padding: "0.625rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;

interface GlobalErrorProps {
  /** The error that was thrown in the root layout */
  error: Error & { digest?: string };

  /** Resets the error boundary and retries rendering the root layout */
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.message}>{error.message || "A critical error occurred"}</p>
          <button onClick={reset} style={styles.button}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
