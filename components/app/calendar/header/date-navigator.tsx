import { useMemo } from "react";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCalendar } from "@/contexts/calendar-context";
import { Badge } from "@/components/shadcnUI/ui/badge";
import { Button } from "@/components/shadcnUI/ui/button";
import { getEventsCount, navigateDate, rangeText } from "@/lib/helpers";
import { Props } from "@/types/interfaces";

export function DateNavigator({ view, events }: Props) {
  const { selectedDate, setSelectedDate } = useCalendar();

  // Ensure selectedDate is a valid Date object
  const validDate = useMemo(() => {
    if (
      !selectedDate ||
      !(selectedDate instanceof Date) ||
      isNaN(selectedDate.getTime())
    ) {
      return new Date(); // Fallback to current date
    }

    return selectedDate;
  }, [selectedDate]);

  const month = formatDate(validDate, "MMMM");
  const year = validDate.getFullYear();

  const eventCount = useMemo(
    () => getEventsCount(events, validDate, view),
    [events, validDate, view],
  );

  const handlePrevious = () =>
    setSelectedDate(navigateDate(validDate, view, "previous"));
  const handleNext = () =>
    setSelectedDate(navigateDate(validDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">
          {month} {year}
        </span>
        <Badge className="px-1.5" variant="outline">
          {eventCount} events
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="size-6.5 px-0 [&_svg]:size-4.5"
          variant="outline"
          onClick={handlePrevious}
        >
          <ChevronLeft />
        </Button>

        <p className="text-sm text-muted-foreground text-black">
          {rangeText(view, validDate)}
        </p>

        <Button
          className="size-6.5 px-0 [&_svg]:size-4.5"
          variant="outline"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
