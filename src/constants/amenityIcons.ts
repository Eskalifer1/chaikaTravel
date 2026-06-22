import type { ComponentPropsWithoutRef } from "react";

import { AMENITY_KEYS, type AmenityKey } from "@/types";

import AirConditioningIcon from "@/components/Icons/AirConditioningIcon";
import BreakfastIcon from "@/components/Icons/BreakfastIcon";
import GymIcon from "@/components/Icons/GymIcon";
import MiniBarIcon from "@/components/Icons/MiniBarIcon";
import ParkingIcon from "@/components/Icons/ParkingIcon";
import PoolIcon from "@/components/Icons/PoolIcon";
import TvIcon from "@/components/Icons/TvIcon";
import WifiIcon from "@/components/Icons/WifiIcon";

type SvgComponent = (props: ComponentPropsWithoutRef<"svg">) => React.ReactElement;

/** Maps each amenity key to its corresponding icon component */
export const AMENITY_ICONS: Record<AmenityKey, SvgComponent> = {
  [AMENITY_KEYS.wifi]: WifiIcon,
  [AMENITY_KEYS.tv]: TvIcon,
  [AMENITY_KEYS.airConditioning]: AirConditioningIcon,
  [AMENITY_KEYS.miniBar]: MiniBarIcon,
  [AMENITY_KEYS.parking]: ParkingIcon,
  [AMENITY_KEYS.pool]: PoolIcon,
  [AMENITY_KEYS.gym]: GymIcon,
  [AMENITY_KEYS.breakfast]: BreakfastIcon,
};
