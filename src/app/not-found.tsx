export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-6xl font-bold text-text-primary">404</h1>
      <p className="mt-4 text-lg text-text-secondary">Page not found</p>
      <a href="/" className="mt-8 text-primary underline-offset-4 hover:underline">
        Go back home
      </a>
    </div>
  );
}
