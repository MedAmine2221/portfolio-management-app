"use server";
import { adminDb } from "@/config/firebase-admin.init";
import { AppUser } from "@/types";
import { IEvent } from "@/types/interfaces";
import { cookies } from "next/headers";

export const saveToken = async ({token}:any) =>{
    (await cookies())?.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "strict",
    });
}

export const getToken = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token');
  const tokenValue = token?.value;
  return tokenValue;
}

export const removeToken = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete('token');
}


export const getCalendar = async (): Promise<IEvent[]> => {
  const snapshot = await adminDb.collection("contact").get();

  const eventsFromContacts: IEvent[] = snapshot.docs.map((doc, index) => {
    const data = doc.data();
    const start = new Date(data.startDate);
    start.setHours(start.getHours() - 1);
    const end = new Date(data.endDate);
    end.setHours(end.getHours() - 1);

    return {
      id: index,
      title: data.object,
      description: data.message,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      color: "blue",
      user: {
        id: doc.id,
        name: `${data.lastName} ${data.firstName}`,
        picturePath: null,
      },
    };
  });
  return eventsFromContacts;
  
}

export const getClients = async (): Promise<AppUser[]> => {
  const snapshot = await adminDb.collection("contact").get();
  const users = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<AppUser, 'id'>;
    return {
      id: doc.id,
      ...data,
    };
  });
  return users;
}