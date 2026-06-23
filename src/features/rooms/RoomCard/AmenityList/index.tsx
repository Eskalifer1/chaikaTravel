import type { Amenity } from "@/types";
import { AMENITY_ICONS } from "@/constants/amenityIcons";

import Icon from "@/components/Icon";

interface AmenityListProps {
  /** List of amenities to display */
  amenities: Amenity[];
}

export default function AmenityList({ amenities }: AmenityListProps) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Room amenities">
      {amenities.map((amenity) => {
        const icon = AMENITY_ICONS[amenity.key];
        if (!icon) {
          return <span key={amenity.key}>{amenity.label}</span>;
        }
        return (
          <li key={amenity.key} className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Icon svg={icon} className="h-4 w-4 shrink-0" label={amenity.label} />
            <span>{amenity.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
