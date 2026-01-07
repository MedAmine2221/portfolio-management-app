// app/calendar/ClientContainer.tsx (SERVER)
import { adminDb } from "@/config/firebase-admin.init";
import { IEvent } from "../interfaces";
import { TCalendarView } from "../types";
import { CalendarClient } from "./calendar-client";

interface IProps {
  view: TCalendarView;
}

export async function ClientContainer({ view }: IProps) {
  type AppUser = {
    firstName: string;
    lastName: string;
    object: string;
    message: string;
    appointment: string;
  };

  const snapshot = await adminDb.collection("contact").get();

  const eventsFromContacts: IEvent[] = snapshot.docs.map((doc, index) => {
    const data = doc.data() as AppUser;

    return {
      id: index,
      title: data.object,
      description: data.message,
      startDate: data.appointment,
      endDate: data.appointment,
      color: "blue",
      user: {
        id: doc.id,
        name: `${data.lastName} ${data.firstName}`,
        picturePath: null,
      },
    };
  });

  return <CalendarClient view={view} events={eventsFromContacts} />;
}
