import { eventBulletVariants } from "@/constants";
import { cn } from "@/lib/utils";
import { TEventColor } from "@/types";

export function EventBullet({
  color,
  className,
}: {
  color: TEventColor;
  className: string;
}) {
  return <div className={cn(eventBulletVariants({ color, className }))} />;
}
