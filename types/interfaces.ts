import { ThemeProviderProps } from "next-themes";
import { TCalendarView, TEventColor } from ".";
import { VariantProps } from "class-variance-authority";
import { badgeVariants, buttonVariants, eventBadgeVariants } from "@/constants";

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
  meetingGoogleId: string;
  meetingLink: string;
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

export interface DeleteEventProps {
  children: React.ReactNode;
  action: () => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  event?: IEvent;
}
export interface AgendaDayGroupProps {
  date: Date;
  events: IEvent[];
  multiDayEvents: IEvent[];
}

export interface AgendaEventCardProps {
  event: IEvent;
  eventCurrentDay?: number;
  eventTotalDays?: number;
}


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}


export interface MonthEventProps
  extends Omit<
    VariantProps<typeof eventBadgeVariants>,
    "color" | "multiDayPosition"
  > {
  event: IEvent;
  cellDate: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: "first" | "middle" | "last" | "none";
}


export interface IDragItem {
  event: IEvent;
  children: React.ReactNode;
  width: number;
  height: number;
}
