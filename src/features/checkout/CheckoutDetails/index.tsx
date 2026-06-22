import Table from "@/components/Table";
import type { ResolvedSearchParams } from "@/types";
import CheckoutEmptyState from "./CheckoutEmptyState";

interface CheckoutDetailsProps {
  /** Raw URL search param entries to display */
  params: [string, ResolvedSearchParams[string]][];
}

export default function CheckoutDetails({ params }: CheckoutDetailsProps) {
  if (params.length === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {params.map(([key, value]) => (
          <Table.Row key={key}>
            <Table.Cell variant="secondary">{key}</Table.Cell>
            <Table.Cell variant="primary">
              {Array.isArray(value) ? value.join(", ") : (value || "—")}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
