"use client";
import { CalendarClient } from "./calendar-client";
import { TCalendarView } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/types/interfaces";

export function ClientContainer({ view }: { view: TCalendarView }) {
  const event: IEvent[] = useSelector((item: RootState) => item.calendar.calendar);
  const clients = useSelector((item: RootState) => item.clients.clients);

  return (
    <>
      <div className="flex gap-4 justify-center flex-wrap mt-4">
        {/* Card Clients */}
        <div className="border-2 border-[#1a7ef0] rounded-xl shadow-lg bg-white p-6 flex flex-col items-center transition-transform hover:scale-105">
          <p className="text-gray-500 text-lg mb-1 font-bold">Nombre des clients :</p>
          <p className="text-2xl font-bold text-[#1a7ef0]">{clients.length}</p>
        </div>

        {/* Card Projets */}
        <div className="border-2 border-[#1a7ef0] rounded-xl shadow-lg bg-white p-6 flex flex-col items-center transition-transform hover:scale-105">
          <p className="text-gray-500 text-lg mb-1 font-bold">Nombre des projets réalisés :</p>
          <p className="text-2xl font-bold text-[#1a7ef0]">9</p>
        </div>
      </div>

      <div className="mt-6">
        <CalendarClient view={view} events={event} />
      </div>
    </>
  );
}
