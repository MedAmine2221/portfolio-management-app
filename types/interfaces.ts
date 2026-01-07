import { TCalendarView, TEventColor } from ".";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IEvent {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  description: string;
  user: IUser;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}

export interface Props {
  view: TCalendarView;
  events: IEvent[];
}

export interface DraggableEventProps {
  event: IEvent;
  children: React.ReactNode;
}
export interface DroppableDayCellProps {
  cell: ICalendarCell;
  children: React.ReactNode;
}

export interface DroppableTimeBlockProps {
  date: Date;
  hour: number;
  minute: number;
  children: React.ReactNode;
}

export interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}
export interface DayCellProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

export interface CalendarTimeLineProps {
  firstVisibleHour: number;
  lastVisibleHour: number;
}
export interface DayViewMultiDayEventsRowProps {
  selectedDate: Date;
  multiDayEvents: IEvent[];
}