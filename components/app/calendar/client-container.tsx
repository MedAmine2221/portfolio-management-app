"use client";
import { CalendarClient } from "./calendar-client";
import { TCalendarView } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/types/interfaces";

interface IProps {
  view: TCalendarView;
}

export function ClientContainer({ view }: IProps) {
  const event: IEvent[] = useSelector((item: RootState)=>item.calendar.calendar)  
  return <CalendarClient view={view} events={event} />;
}
