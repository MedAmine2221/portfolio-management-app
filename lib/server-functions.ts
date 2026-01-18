"use server";;
import { adminDb } from "@/config/firebase-admin.init";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
export async function hasNextAuthSessionToken(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("next-auth.session-token");
  const sessionCookieProd = (await cookieStore).get("__Secure-next-auth.session-token");
  return !!sessionCookie || !!sessionCookieProd;
}

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
        color: "blue",
        meetingGoogleId: eventData.meetingGoogleId || "",
        meetingLink: eventData.meetingLink || "",
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


export const getCalendarByContactId = async (id: string) => {
  const contactsSnapshot = await adminDb
    .collection("contact")
    .doc(id)
    .get();
  const allEvents: any[] = [];

    const contactData = contactsSnapshot.data();
    const eventsSnapshot = await adminDb
      .collection("contact")
      .doc(id)
      .collection("events")
      .get();
    eventsSnapshot.docs.forEach((eventDoc, index) => {
      const eventData = eventDoc.data();      
      allEvents.push({
        id: eventDoc.id,
        title: contactData?.object || "",
        description: contactData?.message || "",
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        color: "blue",
      });
    });

  return allEvents;
};

export const deleteEvent = async (
  contactId: string,
  eventId: string,
) => {
  try {
    await adminDb
      .collection("contact")
      .doc(contactId)
      .collection("events")
      .doc(eventId)
      .delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};
export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  object: string;
  message: string;
  createdAt: string;
  status: "Waiting" | "Negotiating" | "In progress" |"Cancelled" | "Completed";
  userEventsInfo: any[];
};


export const getClients = async (): Promise<Client[]> => {
  const snapshot = await adminDb.collection("contact").get();

  const users = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() as Omit<Client, "id" | "userEventsInfo">;
      const userEventsInfo = await getCalendarByContactId(doc.id);      
      return {
        id: doc.id,
        ...data,
        userEventsInfo,
      };
    })
  );

  return users;
};


export const getClientById = async (id: string): Promise<any | null> => {  
  const docRef = adminDb.collection("contact").doc(id);  
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return null;
  }

  const data = docSnap.data() as Omit<Client, "id" | "userEventsInfo">;  
  return data
};


export const sendMail = async ({ to, subject, html }: any) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Mohamed Amine LAZREG – Développeur FullStack JS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return ({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}