const fullYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-text-secondary">
        © {fullYear} ChaikaTravel. All rights reserved.
      </div>
    </footer>
  );
}
