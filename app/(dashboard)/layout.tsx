import { CalendarProvider } from "@/contexts/calendar-context";

import { getEvents, getUsers } from "@/calendar/requests";
import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);
  return (
    <CalendarProvider users={users} events={events}>

      <div className="mx-auto flex max-w-screen flex-col gap-4 px-8 py-4">
        <Navbar />
        {children}
      </div>
    </CalendarProvider>
  );
}
