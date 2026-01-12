"use server";
import { cookies } from "next/headers";

import { adminDb } from "@/config/firebase-admin.init";
import { AppUser } from "@/types";

export const saveToken = async ({ token }: any) => {
  (await cookies())?.set("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
    sameSite: "strict",
  });
};

export const getToken = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");
  const tokenValue = token?.value;

  return tokenValue;
};

export const removeToken = async () => {
  const cookieStore = cookies();

  (await cookieStore).delete("token");
};

export const getCalendar = async () => {
  const contactsSnapshot = await adminDb.collection("contact").get();

  const allEvents: any[] = [];

  for (const contactDoc of contactsSnapshot.docs) {
    const contactData = contactDoc.data();
    const eventsSnapshot = await adminDb
      .collection("contact")
      .doc(contactDoc.id)
      .collection("events")
      .get();

    eventsSnapshot.docs.forEach((eventDoc, index) => {
      const eventData = eventDoc.data();

      allEvents.push({
        id: eventDoc.id,
        title: contactData.object,
        description: contactData.message,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        progress: "to do",
        color: "blue",

        user: {
          id: contactDoc.id,
          name: `${contactData.lastName} ${contactData.firstName}`,
          email: contactData.email,
          picturePath: null,
        },
      });
    });
  }

  return allEvents;
};

export const getClients = async (): Promise<AppUser[]> => {
  const snapshot = await adminDb.collection("contact").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<AppUser, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });

  return users;
};
