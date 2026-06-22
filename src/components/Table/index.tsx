type TableCellVariant = "primary" | "secondary" | "mono";

const cellVariantClasses: Record<TableCellVariant, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  mono: "font-mono text-text-primary",
};

function TableRoot({ className, ...rest }: React.ComponentPropsWithoutRef<"table">) {
  return <table className={`w-full border-collapse text-sm ${className ?? ""}`} {...rest} />;
}

function TableHead(props: React.ComponentPropsWithoutRef<"thead">) {
  return <thead {...props} />;
}

function TableBody(props: React.ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} />;
}

function TableRow({ className, ...rest }: React.ComponentPropsWithoutRef<"tr">) {
  return <tr className={`border-b border-border last:border-0 ${className ?? ""}`} {...rest} />;
}

function TableHeaderCell({ className, ...rest }: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={`py-2 pr-6 text-left font-semibold text-text-secondary ${className ?? ""}`}
      {...rest}
    />
  );
}

interface TableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  /** Visual style of the cell content */
  variant?: TableCellVariant;
}

function TableCell({ variant = "primary", className, ...rest }: TableCellProps) {
  return <td className={`py-2 pr-6 ${cellVariantClasses[variant]} ${className ?? ""}`} {...rest} />;
}

const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});

export default Table;
