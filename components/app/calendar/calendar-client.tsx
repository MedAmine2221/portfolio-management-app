"use client";;
import { CalendarHeader } from "./header/calendar-header";
import { DndProviderWrapper } from "./dnd/dnd-provider";
import { CalendarMonthView } from "./month-view/calendar-month-view";
import { CalendarAgendaView } from "./agenda-view/calendar-agenda-view";

import { Props } from "@/types/interfaces";

export function CalendarClient({ view, events }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border shadow-xl border-default-200">
      <CalendarHeader events={events} view={view} />

      <DndProviderWrapper>
        {view === "month" && <CalendarMonthView Events={events} />}
        {view === "agenda" && <CalendarAgendaView Events={events} />}
      </DndProviderWrapper>
    </div>
  );
}
