import type { MealPlan } from "@/types";

import Icon from "@/components/Icon";
import MealIcon from "@/components/Icons/MealIcon";

interface RatePlanMealProps {
  /** Meal plan included in this rate; undefined means room-only */
  meal: MealPlan | undefined;
}

export default function RatePlanMeal({ meal }: RatePlanMealProps) {
  if (!meal) {
    return <p className="text-text-secondary">Room only</p>;
  }

  return (
    <p className="flex items-center gap-1.5 text-text-secondary">
      <Icon svg={MealIcon} className="h-3.5 w-3.5 shrink-0" />
      <span>{meal.label}</span>
    </p>
  );
}
