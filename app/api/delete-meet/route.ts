import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { eventId } = await req.json();
  console.log("Deleting event with ID:", eventId);
  
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
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
      sendUpdates: "all",
    });

    return new Response(
      JSON.stringify({ message: "Meeting deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Calendar error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete meeting" }),
      { status: 500 }
    );
  }
}
