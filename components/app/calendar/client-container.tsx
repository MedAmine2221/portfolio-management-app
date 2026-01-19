"use client";
import { useSelector } from "react-redux";

import { CalendarClient } from "./calendar-client";

import { TCalendarView } from "@/types";
import { RootState } from "@/redux/store";
import { IEvent } from "@/types/interfaces";
import { useMemo } from "react";
import { Skeleton } from "@/components/shadcnUI/ui/skeleton";

export function ClientContainer({ view }: { view: TCalendarView }) {
  const event: IEvent[] = useSelector(
    (item: RootState) => item.calendar.calendar,
  );
  const loading: boolean = useSelector(
    (item: RootState) => item.loading.loading,
  );
  const clients = useSelector((item: RootState) => item.clients.clients);
  const eventList = useMemo(()=>{
    return event
  },[event]);
  
  const clientList = useMemo(()=>{
    return clients
  },[clients]);

  if (loading) {
    return (
      <div className="space-y-6 mt-4">
        {/* Cards Skeleton */}
        <div className="flex gap-4 justify-center flex-wrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-[#1a7ef0]/30 rounded-xl shadow-lg bg-white p-6 w-[260px]"
            >
              <Skeleton className="h-5 w-40 mb-3" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>

        {/* Calendar Skeleton */}
        <div className="space-y-2">
          {/* Week days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 justify-center flex-wrap mt-4">
        {/* Card Clients */}
        <div className="border-2 border-[#1a7ef0] rounded-xl shadow-lg bg-white p-6 flex flex-col items-center transition-transform hover:scale-105">
          <p className="text-gray-500 text-lg mb-1 font-bold">
            Number of customers :
          </p>
          <p className="text-2xl font-bold text-[#1a7ef0]">
            {clientList.length > 0 ? clientList.length : "pas des client"}
          </p>
        </div>

        {/* Card Projets */}
        <div className="border-2 border-[#1a7ef0] rounded-xl shadow-lg bg-white p-6 flex flex-col items-center transition-transform hover:scale-105">
          <p className="text-gray-500 text-lg mb-1 font-bold">
            Number of projects completed :
          </p>
          <p className="text-2xl font-bold text-[#1a7ef0]">9</p>
        </div>
      </div>

      <div className="mt-6">
        <CalendarClient events={eventList} view={view} />
      </div>
    </>
  );
}
