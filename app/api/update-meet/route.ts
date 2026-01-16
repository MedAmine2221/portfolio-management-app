import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { eventId, startDate, endDate } =
    await req.json();
  
  if (!eventId) {
    return new Response(JSON.stringify({ error: "eventId is required" }), {
      status: 400,
    });
  }

  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({
    access_token: session.accessToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: authClient,
  });

  try {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    const event: any = {};

    if (start) {
      if (isNaN(start.getTime())) throw new Error("Invalid startDate");
      event.start = {
        dateTime: start.toISOString(),
        timeZone: "UTC",
      };
    }
    if (end) {
      if (isNaN(end.getTime())) throw new Error("Invalid endDate");
      event.end = {
        dateTime: end.toISOString(),
        timeZone: "UTC",
      };
    }
    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: event,
      sendUpdates: "all",
    });

    return new Response(
      JSON.stringify({
        message: "Meeting updated successfully",
        meetLink: response.data?.hangoutLink,
        eventId: response.data?.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Calendar error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update meeting" }),
      { status: 500 }
    );
  }
}
