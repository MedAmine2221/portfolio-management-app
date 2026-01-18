"use client";;
import type { DayCellProps } from "@/types/interfaces";

import { useMemo } from "react";
import { isToday, startOfDay } from "date-fns";

import { EventBullet } from "@/components/app/calendar/month-view/event-bullet";
import { MonthEventBadge } from "@/components/app/calendar/month-view/month-event-badge";
import { cn, deleteMeetingLink, getCancelTemplateMail } from "@/lib/utils";
import { getMonthCellEvents } from "@/lib/helpers";
import { FiTrash2 } from "react-icons/fi";
import { deleteEvent, sendMail } from "@/lib/server-functions";
import { DeleteEventDialog } from "../dialogs/delete-event-dialog";
import { MAX_VISIBLE_EVENTS, monthsList } from "@/constants";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoadingFalse, setLoadingTrue } from "@/redux/loadingReducer";
import { deleteEventFromCalendar } from "@/redux/calendar/calendarReducer";


export function DayCell({ cell, events, eventPositions }: DayCellProps) {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  );
  const isSunday = date.getDay() === 0;
  const onDelete = async (event: any) => {
    try{
      dispatch(setLoadingTrue());
      deleteEvent(event.user.id, String(event.id))
      if(event.meetingGoogleId){                        
        await deleteMeetingLink({
          eventId: event.meetingGoogleId,
        });
      }
      const template = getCancelTemplateMail({
        data: {
          client: event.user.name,
          date: `${new Date(event.startDate).getDay()} ${monthsList[new Date(event.startDate).getMonth()]} ${new Date(event.startDate).getFullYear()}`,
          startDate:
            new Date(event.startDate).getHours() +
            "h:" +
            new Date(event.startDate).getMinutes() +
            "min",
            object: event.title,
            reason: "Meeting cancelled",
        },
      });
      await sendMail(
        {
          to: event.user.email,
          subject: event.title,
          html: template,
        }
      )

    }catch(err){
      console.error("Error deleting event:", err);
    }finally{
      dispatch(deleteEventFromCalendar({id: event.id}));
      dispatch(setLoadingFalse());
    }
  }
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-1 border-l border-t py-1.5 lg:pb-2 lg:pt-1",
        isSunday && "border-l-0",
      )}
    >
      <button
        className={cn(
          "flex size-6 translate-x-1 items-center justify-center rounded-full text-xs font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:px-2",
          !currentMonth && "opacity-20",
          isToday(date) &&
            "bg-primary font-bold text-primary-foreground hover:bg-primary",
        )}
      >
        {day}
      </button>

      <div
        className={cn(
          "flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0",
          !currentMonth && "opacity-50",
        )}
      >
        {[0, 1, 2].map((position) => {
          const event = cellEvents.find((e) => e.position === position);
          const eventKey = event
            ? `event-${event.id}-${position}`
            : `empty-${position}`;

          return (
            <div key={eventKey} className="lg:flex-1">
              {event && (
                <>
                  <EventBullet className="lg:hidden" color={event.color} />
                  <div className="flex flex-row items-center">
                    <DeleteEventDialog action={async ()=>{
                      onDelete(event);
                    }}>
                      {
                      !loading ?
                        <FiTrash2 className="mx-2 text-lg font-bold" color="red"/>
                        :
                        <Loader2 className="animate-spin mx-2 text-lg font-bold" color="red"/>
                      }
                    </DeleteEventDialog>
                    <MonthEventBadge
                      cellDate={startOfDay(date)}
                      className="hidden lg:flex"
                      event={event}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {cellEvents.length > MAX_VISIBLE_EVENTS && (
        <p
          className={cn(
            "h-4.5 px-1.5 text-xs font-semibold text-muted-foreground",
            !currentMonth && "opacity-50",
          )}
        >
          <span className="sm:hidden">
            +{cellEvents.length - MAX_VISIBLE_EVENTS}
          </span>
          <span className="hidden sm:inline">
            {" "}
            {cellEvents.length - MAX_VISIBLE_EVENTS} more...
          </span>
        </p>
      )}
    </div>
  );
}
