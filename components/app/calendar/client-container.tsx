"use client";
import { CalendarClient } from "./calendar-client";
import { TCalendarView } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/types/interfaces";
export function ClientContainer({ view }: {
  view: TCalendarView;
}) {
  const event: IEvent[] = useSelector((item: RootState)=>item.calendar.calendar)  
  return <CalendarClient view={view} events={event} />;
}
