import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          ChaikaTravel
        </Link>
      </div>
    </header>
  );
}
