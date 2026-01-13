import Link from "next/link";
import { Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/shadcnUI/ui/button";
import { TodayButton } from "@/components/app/calendar/header/today-button";
import { DateNavigator } from "@/components/app/calendar/header/date-navigator";
import { AddEventDialog } from "@/components/app/calendar/dialogs/add-event-dialog";
import { Props } from "@/types/interfaces";

export function CalendarHeader({ view, events }: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-b-default-100 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator events={events} view={view} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              asChild
              aria-label="View by month"
              className="-ml-px rounded-r-none [&_svg]:size-5"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
            >
              <Link href="/calendar/month-view">
                <Grid2x2 strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by agenda"
              className="-ml-px rounded-l-none [&_svg]:size-5"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
            >
              <Link href="/calendar/agenda-view">
                <CalendarRange strokeWidth={1.8} />
              </Link>
            </Button>
          </div>
        </div>

        <AddEventDialog>
          <Button className="font-bold w-full sm:w-auto">
            <Plus />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
    </div>
  );
}
