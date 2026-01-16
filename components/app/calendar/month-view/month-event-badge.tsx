import type { IEvent, MonthEventProps } from "@/types/interfaces";
import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";
import { endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";

import { useCalendar } from "@/contexts/calendar-context";
import { EventDetailsDialog } from "@/components/app/calendar/dialogs/event-details-dialog";
import { cn } from "@/lib/utils";
import { eventBadgeVariants } from "@/constants";

export function MonthEventBadge({
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: MonthEventProps) {
  const { badgeVariant } = useCalendar();

  const itemStart = startOfDay(parseISO(event.startDate));
  const itemEnd = endOfDay(parseISO(event.endDate));

  if (cellDate < itemStart || cellDate > itemEnd) return null;

  let position: "first" | "middle" | "last" | "none" | undefined;

  if (propPosition) {
    position = propPosition;
  } else if (eventCurrentDay && eventTotalDays) {
    position = "none";
  } else if (isSameDay(itemStart, itemEnd)) {
    position = "none";
  } else if (isSameDay(cellDate, itemStart)) {
    position = "first";
  } else if (isSameDay(cellDate, itemEnd)) {
    position = "last";
  } else {
    position = "middle";
  }

  const renderBadgeText = ["first", "none"].includes(position);

  const color = (
    badgeVariant === "dot" ? `${event.color}-dot` : event.color
  ) as VariantProps<typeof eventBadgeVariants>["color"];

  const eventBadgeClasses = cn(
    eventBadgeVariants({ color, multiDayPosition: position, className }),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.click();
    }
  };

  return (
    <EventDetailsDialog event={event}>
      <div
        className={eventBadgeClasses}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-1.5 truncate">
          {!["middle", "last"].includes(position) &&
            ["mixed", "dot"].includes(badgeVariant) && (
              <svg
                className="event-dot shrink-0"
                height="8"
                viewBox="0 0 8 8"
                width="8"
              >
                <circle cx="4" cy="4" r="4" />
              </svg>
            )}

          {renderBadgeText && (
            <p className="flex-1 truncate font-semibold">
              {eventCurrentDay && (
                <span className="text-xs">
                  Day {eventCurrentDay} of {eventTotalDays} •{" "}
                </span>
              )}
              {event.title}
            </p>
          )}
        </div>

        {renderBadgeText && (
          <span>{format(new Date(event.startDate), "h:mm a")}</span>
        )}
      </div>
    </EventDetailsDialog>
  );
}
