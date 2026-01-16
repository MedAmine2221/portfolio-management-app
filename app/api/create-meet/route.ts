import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(
      JSON.stringify({ error: "Not authenticated" }),
      { status: 401 }
    );
  }

  const { title, description, startDate, endDate, attendees } = await req.json();
  
  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({
    access_token: session.accessToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: authClient,
  });

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new Response(
        JSON.stringify({ error: "Invalid startDate or endDate" }),
        { status: 400 }
      );
    }

    const event = {
      summary: title || "Next.js Google Meet",
      description: description || "Created via API",
      start: {
        dateTime: start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "UTC",
      },
      attendees: (attendees || []).map((email: string) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: event,
    });


    return new Response(
      JSON.stringify({
        meetLink: response.data?.hangoutLink,
        eventId: response.data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Google Calendar error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create Google Meet link" }),
      { status: 500 }
    );
  }
}
