"use client";

interface ErrorPageProps {
  /** The error that was thrown */
  error: Error & { digest?: string };

  /** Resets the error boundary and retries rendering the segment */
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-4xl font-bold text-text-primary">Something went wrong</h1>
      <p className="mt-4 text-lg text-text-secondary">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-radius-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
      >
        Try again
      </button>
    </div>
  );
}
