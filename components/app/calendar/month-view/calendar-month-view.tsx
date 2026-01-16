import type { IProps } from "@/types/interfaces";

import { useMemo } from "react";

import { DayCell } from "./day-cell";

import { useCalendar } from "@/contexts/calendar-context";
import { getCalendarCells, calculateMonthEventPositions } from "@/lib/helpers";
import { WEEK_DAYS } from "@/constants";

export function CalendarMonthView({ Events }: IProps) {
  const { selectedDate } = useCalendar();

  const allEvents = [...Events];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(Events, selectedDate),
    [Events, selectedDate],
  );

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
