import { Navbar } from "@/components/navbar";
import { CalendarProvider } from "@/contexts/calendar-context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CalendarProvider>

      <div className="mx-auto flex max-w-screen flex-col gap-4 px-8 py-4">
        <Navbar />
        {children}
      </div>
    </CalendarProvider>
  );
}
