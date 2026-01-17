import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  object: string;
  message: string;
  createdAt: string;
  status: "Waiting" | "Negotiating" | "In progress" |"Cancelled" | "Completed"
};

export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";
export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
export type TBadgeVariant = "dot" | "colored" | "mixed";
export type TVisibleHours = { from: number; to: number };
