import type { ComponentPropsWithoutRef } from "react";

type SvgComponent = (props: ComponentPropsWithoutRef<"svg">) => React.ReactElement;

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  /** SVG icon component — a .tsx file exporting a function that renders an svg element */
  svg: SvgComponent;

  /** Accessible label; when provided, role="img" is set and aria-label used instead of aria-hidden */
  label?: string;
}

/** Renders an SVG icon with consistent sizing and accessibility attributes */
export default function Icon({ svg: Svg, label, className = "h-4 w-4", ...rest }: IconProps) {
  const a11yProps = label
    ? { role: "img" as const, "aria-label": label, "aria-hidden": undefined }
    : { "aria-hidden": true as const, focusable: "false" as const };

  return <Svg className={className} {...a11yProps} {...rest} />;
}
