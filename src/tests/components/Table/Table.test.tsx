import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Table from "@/components/Table";

describe("Table compound component", () => {
  it("renders a table with header and body", () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>foo</Table.Cell>
            <Table.Cell>bar</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
  });

  it("forwards className to Table root", () => {
    render(<Table className="custom-class" />);
    expect(screen.getByRole("table")).toHaveClass("custom-class");
  });

  it("forwards native html attributes to Table.Cell", () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2} data-testid="cell">
              content
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const cell = screen.getByTestId("cell");
    expect(cell).toHaveAttribute("colspan", "2");
  });

  it("applies variant classes to Table.Cell", () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell variant="secondary" data-testid="secondary">
              sec
            </Table.Cell>
            <Table.Cell variant="mono" data-testid="mono">
              mono
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(screen.getByTestId("secondary")).toHaveClass("text-text-secondary");
    expect(screen.getByTestId("mono")).toHaveClass("font-mono");
  });

  it("renders HeaderCell as th element", () => {
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
      </Table>,
    );

    expect(screen.getByRole("columnheader", { name: "Header" })).toBeInTheDocument();
  });
});
