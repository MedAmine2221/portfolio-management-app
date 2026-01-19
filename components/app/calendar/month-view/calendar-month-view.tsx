import type { IProps } from "@/types/interfaces";

import { useMemo } from "react";

import { DayCell } from "./day-cell";

import { useCalendar } from "@/contexts/calendar-context";
import { getCalendarCells, calculateMonthEventPositions } from "@/lib/helpers";
import { WEEK_DAYS } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/components/shadcnUI/ui/skeleton";

export function CalendarMonthView({ Events }: IProps) {
  const { selectedDate } = useCalendar();
  const loading = useSelector(
    (state: RootState) => state.loading.loading
  );
  const allEvents = [...Events];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(Events, selectedDate),
    [Events, selectedDate],
  );
  if (loading) {
    return (
      <div className="space-y-2">
        {/* Week days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-7 divide-x">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-muted-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            eventPositions={eventPositions}
            events={allEvents}
          />
        ))}
      </div>
    </div>
  );
}
