import { Navbar } from "@/components/navbar";
import { CalendarProvider } from "@/contexts/calendar-context";
import { ChildrenProps } from "@/types/interfaces";

export default async function Layout({
  children,
}: ChildrenProps) {
  return (
    <CalendarProvider>
      <div className="mx-auto flex max-w-screen flex-col gap-4 px-2 py-4">
        <Navbar />
        {children}
      </div>
    </CalendarProvider>
  );
}
