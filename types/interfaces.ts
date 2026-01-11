import { TCalendarView, TEventColor } from ".";

export interface IUser {
  id: string;
  name: string;
  email: string;
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

export interface IProps {
  Events: IEvent[];
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