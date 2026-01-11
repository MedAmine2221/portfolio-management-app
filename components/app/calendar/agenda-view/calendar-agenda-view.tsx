import { useMemo } from "react";
import { CalendarX2 } from "lucide-react";
import { parseISO, format, endOfDay, startOfDay, isSameMonth } from "date-fns";

import { useCalendar } from "@/contexts/calendar-context";

import { ScrollArea } from "@/components/shadcnUI/ui/scroll-area";

import type { IEvent, IProps } from "@/types/interfaces";
import { AgendaDayGroup } from "./agenda-day-group";

export function CalendarAgendaView({ Events }: IProps) {
  const { selectedDate } = useCalendar();
  
  const eventsByDay = useMemo(() => {
    const allDates = new Map<string, { date: Date; events: IEvent[]; Events: IEvent[] }>();

    Events.forEach(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);

      let currentDate = startOfDay(eventStart);
      const lastDate = endOfDay(eventEnd);

      while (currentDate <= lastDate) {
        if (isSameMonth(currentDate, selectedDate)) {
          const dateKey = format(currentDate, "yyyy-MM-dd");

          if (!allDates.has(dateKey)) {
            allDates.set(dateKey, { date: new Date(currentDate), events: [], Events: [] });
          }

          allDates.get(dateKey)?.Events.push(event);
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    });

    return Array.from(allDates.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [ Events, selectedDate]);

  const hasAnyEvents = Events.length > 0;
  const hasEventsInMonth = eventsByDay.length > 0;

  return (
    <div className="h-[800px]">
      <ScrollArea className="h-full" type="always">
        <div className="space-y-6 p-4">
          {
            hasAnyEvents && hasEventsInMonth ? 
              eventsByDay.map(dayGroup => (
               <AgendaDayGroup key={format(dayGroup.date, "yyyy-MM-dd")} date={dayGroup.date} events={dayGroup.events} multiDayEvents={dayGroup.Events} />

              ))
            :
              <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                <CalendarX2 className="size-10" />
                <p className="text-sm md:text-base">No events scheduled for the selected month</p>
              </div>
          }
        </div>
      </ScrollArea>
    </div>
  );
}