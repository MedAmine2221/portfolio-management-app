import { useMemo } from "react";

import { useCalendar } from "@/contexts/calendar-context";

import { getCalendarCells, calculateMonthEventPositions } from "@/lib/helpers";

import type { IProps } from "@/types/interfaces";
import { DayCell } from "./day-cell";



const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarMonthView({ Events }: IProps) {
  const { selectedDate } = useCalendar();

  const allEvents = [...Events];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(Events, selectedDate),
    [Events, selectedDate]
  );

  return (
    <div>
      <div className="grid grid-cols-7 divide-x">
        {WEEK_DAYS.map(day => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map(cell => (
          <DayCell key={cell.date.toISOString()} cell={cell} events={allEvents} eventPositions={eventPositions} />
        ))}
      </div>
    </div>
  );
}
