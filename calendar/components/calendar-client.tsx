// app/calendar/calendar-client.tsx
"use client";

import { TCalendarView } from "../types";
import { CalendarHeader } from "./header/calendar-header";
import { DndProviderWrapper } from "./dnd/dnd-provider";
import { CalendarMonthView } from "./month-view/calendar-month-view";
import { CalendarWeekView } from "./week-and-day-view/calendar-week-view";
import { CalendarAgendaView } from "./agenda-view/calendar-agenda-view";
import { IEvent } from "../interfaces";

interface Props {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarClient({ view, events }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border shadow-xl border-default-200">
      <CalendarHeader view={view} events={events} />

      <DndProviderWrapper>
        {view === "month" && (
          <CalendarMonthView
            singleDayEvents={events}
            multiDayEvents={events}
          />
        )}

        {view === "week" && (
          <CalendarWeekView
            singleDayEvents={events}
            multiDayEvents={events}
          />
        )}

        {view === "agenda" && (
          <CalendarAgendaView
            singleDayEvents={events}
            multiDayEvents={events}
          />
        )}
      </DndProviderWrapper>
    </div>
  );
}
