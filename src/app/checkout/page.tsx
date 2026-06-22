import type { NextSearchParams } from "@/types";

import CheckoutDetails from "@/features/checkout/CheckoutDetails";

interface CheckoutPageProps {
  /** Raw URL search params passed by Next.js App Router */
  searchParams: NextSearchParams;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = Object.entries(await searchParams);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-text-primary">Checkout</h1>
      <CheckoutDetails params={params} />
    </div>
  );
}
